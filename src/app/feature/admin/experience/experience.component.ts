import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './experience.component.html',
})
export class ExperienceComponent {
  experienceForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    fromDate: new FormControl('', Validators.required),
    toDate: new FormControl('', Validators.required),
    image: new FormControl<File | null>(null),
  });

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.experienceForm.get('image')?.setValue(file);
    }
  }

  submitExperienceForm() {
    if (this.experienceForm.valid) {
      console.log('Experience Submitted:', this.experienceForm.value);
      this.experienceForm.reset();
    }
  }
}
