import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';

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
export class AboutComponent {
  aboutForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    cv: new FormControl<File | null>(null),
    photo: new FormControl<File | null>(null),
    facebook: new FormControl(''),
    instagram: new FormControl(''),
    github: new FormControl(''),
    linkedin: new FormControl(''),
    fiverr: new FormControl('')
  });

  onCVSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.aboutForm.get('cv')?.setValue(file);
    }
  }

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.aboutForm.get('photo')?.setValue(file);
    }
  }

  submitAboutForm() {
    if (this.aboutForm.valid) {
      console.log('About form submitted:', this.aboutForm.value);
      this.aboutForm.reset();
    }
  }
}
