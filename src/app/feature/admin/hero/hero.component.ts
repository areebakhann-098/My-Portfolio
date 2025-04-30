import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  experienceOptions = ['1 year', '2 years', '3 years', '5+ years'];
  projectOptions = [5, 10, 15, 20];
  clientOptions = [1, 5, 10, 15];

  heroForm = new FormGroup({
    description: new FormControl('', Validators.required),
    image: new FormControl<File | null>(null),
    experience: new FormControl('', Validators.required),
    projectsCompleted: new FormControl('', Validators.required),
    client: new FormControl('', Validators.required),
  });

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.heroForm.get('image')?.setValue(file);
    }
  }

  submitForm() {
    if (this.heroForm.valid) {
      console.log('Form submitted:', this.heroForm.value);
      this.heroForm.reset();
    }
  }
}
