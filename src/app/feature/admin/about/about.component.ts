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
  aboutDataList: any[] = [];
  imagePreview: string | ArrayBuffer | null = null;
  base64Image: string | null = null;
  selectedFile: File | null = null;

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

  constructor(private firebaseService: FirebaseService) {}

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

  submitAboutForm(): void {
    if (this.aboutForm.invalid || !this.base64Image) {
      alert('Please fill all required fields and select a photo.');
      return;
    }

    // Since the image is already base64, no need to upload it separately
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

    this.firebaseService.addDocument('about', aboutData).subscribe({
      next: () => {
        alert('About info saved successfully!');
        this.aboutForm.reset();
        this.imagePreview = null;
        this.base64Image = null;
        this.selectedFile = null;
        this.getAboutData();
      },
      error: (err) => {
        console.error('Error saving about info:', err);
        alert('Failed to save about info.');
      },
    });
  }
}
