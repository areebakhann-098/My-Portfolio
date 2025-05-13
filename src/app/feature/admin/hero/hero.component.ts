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

  editMode = false;
editingHeroId: string | null = null;
selectedTabIndex = 0; // 0 = Form Tab, 1 = Data List Tab


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
  if (!this.heroForm.valid) {
    alert('Please fill all required fields');
    return;
  }

  this.isSubmitting = true;

  const formValue = { ...this.heroForm.value };
  const maxSize = 5 * 1024 * 1024;

  const processSubmit = (imageUrl: string | ArrayBuffer | null) => {
    const formData = { ...formValue, image: imageUrl };

    if (this.editMode && this.editingHeroId) {
      // === Update flow ===
      this.firebaseService.updateDocument('HeroInfo', this.editingHeroId, formData).subscribe({
        next: () => {
          alert('Hero info updated successfully!');
          this.resetForm();
          this.refreshHeroList();
        },
        error: () => {
          this.isSubmitting = false;
          alert('Error updating hero info');
        },
      });
    } else {
      // === Add new flow ===
      this.firebaseService.addDocument('HeroInfo', formData).subscribe({
        next: () => {
          alert('Hero info added successfully!');
          this.resetForm();
          this.refreshHeroList();
        },
        error: () => {
          this.isSubmitting = false;
          alert('Error adding hero info');
        },
      });
    }
  };

  if (this.selectedImage) {
    if (this.selectedImage.size > maxSize) {
      this.isSubmitting = false;
      alert('Image size exceeds the maximum allowed size of 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      processSubmit(reader.result);
    };
    reader.readAsDataURL(this.selectedImage);
  } else {
    processSubmit(this.previewUrl); // Use existing image if none selected
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
  
  editHero(hero: any): void {
  this.editMode = true;
  this.editingHeroId = hero.id;

  this.heroForm.patchValue({
    title: hero.title,
    description: hero.description,
    experience: hero.experience,
    clients: hero.clients,
    projectsCompleted: hero.projectsCompleted,
  });

  this.previewUrl = hero.image;
  this.selectedImage = null;

  this.selectedTabIndex = 0; // 👈 Switch to form tab automatically
}

resetForm(): void {
  this.heroForm.reset({
    title: '',
    description: '',
    experience: '',
    clients: '',
    projectsCompleted: '',
    image: null
  });
  this.previewUrl = null;
  this.selectedImage = null;
  this.isSubmitting = false;
  this.editMode = false;
  this.editingHeroId = null;
}

refreshHeroList(): void {
  this.firebaseService.getDocuments('HeroInfo').subscribe({
    next: (data) => {
      this.heroDataList = data;
    },
    error: (err) => {
      console.error('Error fetching hero data:', err);
    }
  });
}


}
