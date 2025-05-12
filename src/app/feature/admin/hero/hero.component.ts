import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FirebaseService } from '../Firebase/firebase-service.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  
  heroForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    experience: new FormControl('', Validators.required),
    clients: new FormControl('', Validators.required),
    projectsCompleted: new FormControl('', Validators.required),
    image: new FormControl<File | null>(null),
  });
  ngOnInit(): void {
    this.firebaseService.getDocuments('HeroInfo').subscribe({
      next: (data) => {
        this.heroDataList = data;
      },
      error: (err) => {
        console.error('Error fetching hero data:', err);
      }
    });
    
  }
  previewImage: string | ArrayBuffer | null = null;
  heroDataList: any[] = [];
  selectedImage: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  isSubmitting = false;
  // Inject FirebaseService here
  constructor(private firebaseService: FirebaseService) {}

 

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
        this.heroForm.patchValue({ image: file });
        this.heroForm.get('image')?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    }
  }

  async submitHeroForm(): Promise<void> {
    if (this.heroForm.valid && this.selectedImage) {
      this.isSubmitting = true;
      // Check image size before submitting (example: 5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (this.selectedImage.size > maxSize) {
        this.isSubmitting = false;
        alert('Image size exceeds the maximum allowed size of 5MB.')
        return;
      }
 
      const reader = new FileReader();
      reader.onload = () => {
        const formData = {
          ...this.heroForm.value,
          image: reader.result // Image ko Base64 format me store karna
        };
 
        this.firebaseService.addDocument('HeroInfo', formData).subscribe({
          next: (docRef) => {
            this.isSubmitting = false;
            alert('Introduction data added successfully!');
 
            this.heroForm.reset({
              description: '',
              title: '',
              experience:'',
              clients:'',
              projectsCompleted:'',
              image: null
            });
            this.previewUrl = null;
            this.selectedImage = null;
 
            console.log('Document added successfully:', docRef);
          },
          error: (err) => {
            this.isSubmitting = false;
            alert('Error adding introduction data.')
          }
        });
      };
      reader.readAsDataURL(this.selectedImage);
    } else {
      alert('Please fill all required fields and select an image')
    }
  }
    // Method to delete hero data
  deleteHero(heroId: string): void {
    if (confirm('Are you sure you want to delete this hero info?')) {
      this.firebaseService.deleteDocument('HeroInfo', heroId).subscribe({
        next: () => {
          alert('Hero information deleted successfully!');
          this.heroDataList = this.heroDataList.filter(hero => hero.id !== heroId); // Update the local list
        },
        error: (err) => {
          console.error('Error deleting hero data:', err);
          alert('Error deleting hero data.');
        }
      });

    }
  }
}
