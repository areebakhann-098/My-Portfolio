import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  submittedProfile: any = null;

  fields = [
    { controlName: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name' },
    { controlName: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
    { controlName: 'address', label: 'Address', type: 'text', placeholder: 'Enter your address' },
    { controlName: 'phone', label: 'Phone Number', type: 'text', placeholder: 'Enter your phone number' },
    { controlName: 'facebook', label: 'Facebook', type: 'text', placeholder: 'Facebook profile link' },
    { controlName: 'instagram', label: 'Instagram', type: 'text', placeholder: 'Instagram profile link' },
    { controlName: 'github', label: 'GitHub', type: 'text', placeholder: 'GitHub profile link' },
    { controlName: 'linkedin', label: 'LinkedIn', type: 'text', placeholder: 'LinkedIn profile link' },
    { controlName: 'fiverr', label: 'Fiverr', type: 'text', placeholder: 'Fiverr profile link' },
  ];

  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    facebook: new FormControl(''),
    instagram: new FormControl(''),
    github: new FormControl(''),
    linkedin: new FormControl(''),
    fiverr: new FormControl('')
  });

  submitForm() {
    if (this.profileForm.valid) {
      this.submittedProfile = this.profileForm.value;
      console.log('Profile Data:', this.submittedProfile);
      this.profileForm.reset();
    }
  }
}
