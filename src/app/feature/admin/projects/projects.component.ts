import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  categoryOptions = ['Web Development', 'Mobile App', 'Machine Learning', 'UI/UX Design'];

  projectForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    shortDescription: new FormControl('', Validators.required),
    fullDescription: new FormControl('', Validators.required),
    image: new FormControl<File | null>(null),
  });

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.projectForm.get('image')?.setValue(file);
    }
  }

  submitProjectForm() {
    if (this.projectForm.valid) {
      console.log('Project submitted:', this.projectForm.value);
      this.projectForm.reset();
    }
  }
}
