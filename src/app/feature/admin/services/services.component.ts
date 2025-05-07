import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FirebaseService } from '../Firebase/firebase-service.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule
  ],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  servicesForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  servicesList: any[] = [];

  constructor(private firebaseService: FirebaseService) {
    // Fetch services when component is initialized
    this.fetchServices();
  }

  // Submit the form and add data to Firebase
  submitServicesForm() {
    if (this.servicesForm.valid) {
      const formValue = this.servicesForm.value;
      this.firebaseService.addDocument('services', formValue).subscribe(() => {
        this.fetchServices();  // Reload the services after adding
        this.servicesForm.reset();
        alert('Service info added successfully!');
      }, error => {
        console.error('Error adding service:', error);
        alert('There was an error adding the service.');
      });
    } else {
      alert('Form is invalid!');
    }
  }

  // Fetch services from Firebase
  fetchServices() {
    this.firebaseService.getDocuments('services').subscribe((services: any[]) => {
      this.servicesList = services;
    }, error => {
      console.error('Error fetching services:', error);
      alert('There was an error fetching the services.');
    });
  }
}
