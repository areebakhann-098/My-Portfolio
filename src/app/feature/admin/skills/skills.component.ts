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
    // title: new FormControl('', Validators.required),
    // description: new FormControl('', Validators.required),
    imageTitle: new FormControl('', Validators.required),
    image: new FormControl<File | null>(null),
   
  });

  previewImage: string | ArrayBuffer | null = null;
  selectedImage: File | null = null;
  skillsDataList: any[] = [];
  isSubmitting = false;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
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
    if (this.skillsForm.valid && this.selectedImage) {
      this.isSubmitting = true;

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (this.selectedImage.size > maxSize) {
        this.isSubmitting = false;
        alert('Image size exceeds 5MB limit.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const formData = {
          ...this.skillsForm.value,
          image: reader.result
        };

        this.firebaseService.addDocument('SkillsInfo', formData).subscribe({
          next: () => {
            this.isSubmitting = false;
            alert('Skill data added successfully!');
            this.skillsForm.reset();
            this.previewImage = null;
            this.selectedImage = null;
          },
          error: () => {
            this.isSubmitting = false;
            alert('Error adding skill data.');
          }
        });
      };
      reader.readAsDataURL(this.selectedImage);
    } else {
      alert('Please fill all fields and select an image.');
    }
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

}
