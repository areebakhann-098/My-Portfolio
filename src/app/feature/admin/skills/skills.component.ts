import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { FirebaseService } from '../Firebase/firebase-service.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule
  ],
  templateUrl: './skills.component.html',
})
export class SkillsComponent implements OnInit {
  skillsForm = new FormGroup({
    imageTitle: new FormControl('', Validators.required),
    image: new FormControl<File | null>(null),
  });

  previewImage: string | ArrayBuffer | null = null;
  selectedImage: File | null = null;
  skillsDataList: any[] = [];
  isSubmitting = false;

  isEditMode = false;
  selectedSkillId: string | null = null;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.fetchSkills();
  }

  fetchSkills(): void {
    this.firebaseService.getDocuments('SkillsInfo').subscribe({
      next: (data) => this.skillsDataList = data,
      error: (err) => console.error('Error fetching skills data:', err)
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
        this.skillsForm.patchValue({ image: file });
        this.skillsForm.get('image')?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    }
  }

  async submitSkillsForm(): Promise<void> {
    if (this.skillsForm.invalid || (!this.selectedImage && !this.previewImage)) {
      alert('Please fill all fields and select an image.');
      return;
    }

    this.isSubmitting = true;

    const maxSize = 5 * 1024 * 1024;
    if (this.selectedImage && this.selectedImage.size > maxSize) {
      alert('Image size exceeds 5MB limit.');
      this.isSubmitting = false;
      return;
    }

    const handleFormSubmit = (base64Image: string | ArrayBuffer | null) => {
      const formData = {
        imageTitle: this.skillsForm.value.imageTitle,
        image: base64Image
      };

      const request$ = this.isEditMode && this.selectedSkillId
        ? this.firebaseService.updateDocument('SkillsInfo', this.selectedSkillId, formData)
        : this.firebaseService.addDocument('SkillsInfo', formData);

      request$.subscribe({
        next: () => {
          alert(`Skill ${this.isEditMode ? 'updated' : 'added'} successfully!`);
          this.resetForm();
          this.fetchSkills();
          this.isSubmitting = false;
        },
        error: () => {
          alert(`Error ${this.isEditMode ? 'updating' : 'adding'} skill.`);
          this.isSubmitting = false;
        }
      });
    };

    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = () => handleFormSubmit(reader.result);
      reader.readAsDataURL(this.selectedImage);
    } else {
      handleFormSubmit(this.previewImage);
    }
  }

  editSkill(skill: any): void {
    this.isEditMode = true;
    this.selectedSkillId = skill.id;
    this.skillsForm.patchValue({
      imageTitle: skill.imageTitle,
      image: null // Reset image file input
    });
    this.previewImage = skill.image;
  }

  deleteSkill(skillId: string): void {
    if (confirm('Are you sure you want to delete this skill?')) {
      this.firebaseService.deleteDocument('SkillsInfo', skillId).subscribe({
        next: () => {
          this.skillsDataList = this.skillsDataList.filter(skill => skill.id !== skillId);
          alert('Skill deleted successfully.');
        },
        error: () => {
          alert('Error deleting skill.');
        }
      });
    }
  }

  resetForm(): void {
    this.skillsForm.reset();
    this.previewImage = null;
    this.selectedImage = null;
    this.isEditMode = false;
    this.selectedSkillId = null;
  }
}
