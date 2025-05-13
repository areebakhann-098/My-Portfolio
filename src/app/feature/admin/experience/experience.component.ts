import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { FirebaseService } from '../Firebase/firebase-service.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule
  ],
  templateUrl: './experience.component.html',
})
export class ExperienceComponent implements OnInit {
  experienceForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    fromDate: new FormControl('', Validators.required),
    toDate: new FormControl('', Validators.required),
    badgeClass: new FormControl('', Validators.required),
    image: new FormControl<string | null>(null),
  });

  experienceList: any[] = [];
  previewImage: string | ArrayBuffer | null = null;
  selectedImage: File | null = null;
  isSubmitting = false;
  isEditMode = false;
  selectedExperienceId: string | null = null;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.fetchExperienceData();
  }

  fetchExperienceData(): void {
    this.firebaseService.getDocuments('Experience').subscribe({
      next: (data) => this.experienceList = data,
      error: (err) => console.error('Error fetching experience data:', err)
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
        this.experienceForm.patchValue({ image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  submitExperienceForm(): void {
    if (this.experienceForm.invalid) {
      alert('Please fill all required fields.');
      return;
    }

    this.isSubmitting = true;

    const formValue = this.experienceForm.value;
    const experienceData = {
      title: formValue.title,
      description: formValue.description,
      fromDate: new Date(formValue.fromDate!),
      toDate: new Date(formValue.toDate!),
      badgeClass: formValue.badgeClass,
      image: formValue.image,
    };

    const action$ = this.isEditMode && this.selectedExperienceId
      ? this.firebaseService.updateDocument('Experience', this.selectedExperienceId, experienceData)
      : this.firebaseService.addDocument('Experience', experienceData);

    action$.subscribe({
      next: () => {
        alert(`Experience ${this.isEditMode ? 'updated' : 'added'} successfully!`);
        this.resetForm();
        this.fetchExperienceData();
        this.isSubmitting = false;
      },
      error: (err) => {
        alert(`Error ${this.isEditMode ? 'updating' : 'adding'} experience.`);
        console.error(err);
        this.isSubmitting = false;
      }
    });
  }

  editExperience(experience: any): void {
    this.isEditMode = true;
    this.selectedExperienceId = experience.id;
    this.previewImage = experience.image;
    this.experienceForm.patchValue({
      title: experience.title,
      description: experience.description,
      fromDate: experience.fromDate.toDate ? experience.fromDate.toDate() : experience.fromDate,
      toDate: experience.toDate.toDate ? experience.toDate.toDate() : experience.toDate,
      badgeClass: experience.badgeClass,
      image: experience.image
    });
  }

  deleteExperience(id: string): void {
    if (confirm('Are you sure you want to delete this experience?')) {
      this.firebaseService.deleteDocument('Experience', id).subscribe({
        next: () => {
          alert('Experience deleted successfully!');
          this.fetchExperienceData();
        },
        error: (err) => {
          alert('Error deleting experience.');
          console.error(err);
        }
      });
    }
  }

  resetForm(): void {
    this.experienceForm.reset();
    this.previewImage = null;
    this.selectedImage = null;
    this.isEditMode = false;
    this.selectedExperienceId = null;
  }
}
