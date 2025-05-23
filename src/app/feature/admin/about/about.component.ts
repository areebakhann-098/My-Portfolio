import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FirebaseService } from '../Firebase/firebase-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatFormFieldModule,
  ],
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit {
  selectedTabIndex = 0; // Default to first tab

  aboutDataList: any[] = [];
  imagePreview: string | ArrayBuffer | null = null;
  base64Image: string | null = null;
  selectedFile: File | null = null;
  editingAboutId: string | null = null; // Track the editing about ID

  aboutForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    photo: new FormControl<string | null>(null),
    facebook: new FormControl(''),
    instagram: new FormControl(''),
    github: new FormControl(''),
    linkedin: new FormControl(''),
    fiverr: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
  });

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  ngOnInit(): void {
    this.getAboutData();
  }

  getAboutData(): void {
    this.firebaseService.getDocuments('about').subscribe({
      next: (data) => {
        this.aboutDataList = data;
      },
      error: (error) => {
        console.error('Error fetching about data:', error);
      },
    });
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.base64Image = reader.result as string;
        this.aboutForm.patchValue({ photo: this.base64Image });
        this.aboutForm.get('photo')?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    }
  }

  // Method to handle submit, either for add or update
  submitAboutForm(): void {
    if (this.aboutForm.invalid || !this.base64Image) {
      alert('Please fill all required fields and select a photo.');
      return;
    }

    const aboutData = {
      title: this.aboutForm.value.title,
      description: this.aboutForm.value.description,
      photoUrl: this.base64Image, // Save base64 image
      facebook: this.aboutForm.value.facebook,
      instagram: this.aboutForm.value.instagram,
      github: this.aboutForm.value.github,
      linkedin: this.aboutForm.value.linkedin,
      fiverr: this.aboutForm.value.fiverr,
      address: this.aboutForm.value.address,
      email: this.aboutForm.value.email,
      phoneNumber: this.aboutForm.value.phoneNumber,
    };

    if (this.editingAboutId) {
      // If editing, update the document
      this.firebaseService.updateDocument('about', this.editingAboutId, aboutData).subscribe({
        next: () => {
          alert('About info updated successfully!');
          this.resetForm();
          this.getAboutData();
        },
        error: (err) => {
          console.error('Error updating about info:', err);
          alert('Failed to update about info.');
        },
      });
    } else {
      // If not editing, add new document
      this.firebaseService.addDocument('about', aboutData).subscribe({
        next: () => {
          alert('About info saved successfully!');
          this.resetForm();
          this.getAboutData();
        },
        error: (err) => {
          console.error('Error saving about info:', err);
          alert('Failed to save about info.');
        },
      });
    }
  }

  // Reset form after submission
  resetForm(): void {
    this.aboutForm.reset();
    this.imagePreview = null;
    this.base64Image = null;
    this.selectedFile = null;
    this.editingAboutId = null; // Clear the editing ID
  }

  // Method to populate the form for editing
 

   
  editAboutData(id: string): void {
  const aboutData = this.aboutDataList.find((data) => data.id === id);

  if (aboutData) {
    this.aboutForm.patchValue({
      title: aboutData.title,
      description: aboutData.description,
      facebook: aboutData.facebook,
      instagram: aboutData.instagram,
      github: aboutData.github,
      linkedin: aboutData.linkedin,
      fiverr: aboutData.fiverr,
      address: aboutData.address,
      email: aboutData.email,
      phoneNumber: aboutData.phoneNumber,
    });

    this.imagePreview = aboutData.photoUrl;
    this.base64Image = aboutData.photoUrl;
    this.editingAboutId = id;

    this.selectedTabIndex = 0; // Switch to "Add About Info" tab
  }
}


  // Method to delete the about data
  deleteAboutData(id: string): void {
    if (confirm('Are you sure you want to delete this about info?')) {
      this.firebaseService.deleteDocument('about', id).subscribe({
        next: () => {
          alert('About info deleted successfully.');
          this.getAboutData(); // Refresh list after deletion
        },
        error: (error) => {
          console.error('Error deleting about info:', error);
          alert('Failed to delete about info.');
        }
      });
    }
  }
}
