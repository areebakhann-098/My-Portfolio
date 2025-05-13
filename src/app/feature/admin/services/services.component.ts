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
    MatTabsModule,
  ],
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  servicesForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  servicesList: any[] = [];
  isEditMode = false;
  currentEditId: string | null = null;

  constructor(private firebaseService: FirebaseService) {
    this.fetchServices();
  }

  // Submit form to add or update
  submitServicesForm() {
    if (this.servicesForm.invalid) {
      alert('Form is invalid!');
      return;
    }

    const formValue = this.servicesForm.value;

    if (this.isEditMode && this.currentEditId) {
      // Update mode
      this.firebaseService.updateDocument('services', this.currentEditId, formValue).subscribe({
        next: () => {
          this.fetchServices();
          this.servicesForm.reset();
          this.isEditMode = false;
          this.currentEditId = null;
          alert('Service updated successfully!');
        },
        error: (err) => {
          console.error('Error updating service:', err);
          alert('Error updating service.');
        }
      });
    } else {
      // Add mode
      this.firebaseService.addDocument('services', formValue).subscribe({
        next: () => {
          this.fetchServices();
          this.servicesForm.reset();
          alert('Service added successfully!');
        },
        error: (err) => {
          console.error('Error adding service:', err);
          alert('Error adding service.');
        }
      });
    }
  }

  // Load all services
  fetchServices() {
    this.firebaseService.getDocuments('services').subscribe({
      next: (services: any[]) => this.servicesList = services,
      error: (err) => {
        console.error('Error fetching services:', err);
        alert('There was an error fetching the services.');
      }
    });
  }

  // Delete service
  deleteService(serviceId: string): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.firebaseService.deleteDocument('services', serviceId).subscribe({
        next: () => {
          this.servicesList = this.servicesList.filter(service => service.id !== serviceId);
          alert('Service deleted successfully.');
        },
        error: () => alert('Error deleting service.')
      });
    }
  }

  // Enable edit mode and patch form
  editService(service: any) {
    this.servicesForm.patchValue({
      title: service.title,
      description: service.description
    });
    this.isEditMode = true;
    this.currentEditId = service.id;
  }

  // Cancel editing
  cancelEdit() {
    this.servicesForm.reset();
    this.isEditMode = false;
    this.currentEditId = null;
  }
}
