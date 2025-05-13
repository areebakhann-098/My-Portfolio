import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FirebaseService } from '../Firebase/firebase-service.service';
import { Router, NavigationExtras } from '@angular/router';

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
export class ProfileComponent implements OnInit {
  submittedProfile: any = null;
  selectedTabIndex = 1; // Default to "See Profile Info" when opened from navbar
isEditMode = false;
  isSubmitting = false;

profileDocId: string | null=null;

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

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  ngOnInit() {
    this.fetchProfileData();
  // If navigated with viewProfileOnly flag from navbar
  const viewProfileOnly = history.state['viewProfileOnly'];
  if (viewProfileOnly) {
    this.selectedTabIndex = 1; // Go to "See Profile Info" tab
  }
}

submitForm() {
  if (this.profileForm.valid) {
    const profileData = this.profileForm.value;

    if (this.isEditMode && this.profileDocId) {
      // Update existing profile
      this.firebaseService.updateDocument('profiles', this.profileDocId, profileData).subscribe(
        (response) => {
          console.log('Profile updated:', response);
          this.isEditMode = false;
          this.profileForm.reset();
          this.fetchProfileData();
          this.selectedTabIndex = 1; // Go to see profile
        },
        (error) => {
          console.error('Update error:', error);
        }
      );
    } else {
      // Add new profile
      this.firebaseService.addDocument('profiles', profileData).subscribe(
        (response) => {
          console.log('Profile saved:', response);
          this.profileForm.reset();
          this.fetchProfileData();
          this.selectedTabIndex = 1;
        },
        (error) => {
          console.error('Add error:', error);
        }
      );
    }
  }
}


  fetchProfileData() {
    this.firebaseService.getDocuments('profiles').subscribe(
      (profiles) => {
        if (profiles.length > 0) {
          this.submittedProfile = profiles[0];
        this.profileDocId = profiles[0]['id'];
        }
      },
      (error) => {
        console.error('Fetch error:', error);
      }
    );
  }

  deleteProfile() {
    if (this.submittedProfile) {
      this.firebaseService.deleteDocument('profiles', this.submittedProfile.id).subscribe(
        () => {
          this.submittedProfile = null;
        },
        (error) => {
          console.error('Delete error:', error);
        }

      );
    }
  }
  editProfile() {
  if (this.submittedProfile) {
    this.profileForm.patchValue(this.submittedProfile); // Fill form with data
    this.isEditMode = true;
    this.selectedTabIndex = 0; // Switch to form tab
  }
}

}
