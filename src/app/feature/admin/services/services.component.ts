import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

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

  submitServicesForm() {
    if (this.servicesForm.valid) {
      const formValue = this.servicesForm.value;
      this.servicesList.push({ ...formValue });

      this.servicesForm.reset();
      alert('Service info added successfully!');
    } else {
      alert('Form is invalid!');
    }
  }
}
