
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
    image: new FormControl<File | null>(null),
  });

  experienceList: any[] = [];
  previewImage: string | ArrayBuffer | null = null;
  selectedImage: File | null = null;
  isSubmitting = false;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
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
        this.experienceForm.patchValue({ image: file });
        this.experienceForm.get('image')?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    }
  }

  submitExperienceForm(): void {
    if (this.experienceForm.valid && this.selectedImage) {
      this.isSubmitting = true;

      const reader = new FileReader();
      reader.onload = () => {
        const formValue = this.experienceForm.value;
        const experienceData = {
          title: formValue.title,
          description: formValue.description,
          fromDate: new Date(formValue.fromDate!),  
          toDate: new Date(formValue.toDate!),
          badgeClass: formValue.badgeClass,
          image: reader.result
        };

        this.firebaseService.addDocument('Experience', experienceData).subscribe({
          next: () => {
            this.isSubmitting = false;
            alert('Experience added successfully!');
            this.experienceForm.reset();
            this.previewImage = null;
            this.selectedImage = null;
          },
          error: (err) => {
            this.isSubmitting = false;
            alert('Error adding experience.');
            console.error(err);
          }
        });
      };
      reader.readAsDataURL(this.selectedImage);
    } else {
      alert('Please fill out all fields and select an image.');
    }
  }
}
