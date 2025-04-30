import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './skills.component.html',
})
export class SkillsComponent {
  skillsForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl<File | null>(null),
    imageTitle: new FormControl('', Validators.required),
  });

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.skillsForm.get('image')?.setValue(file);
    }
  }

  submitSkillsForm() {
    if (this.skillsForm.valid) {
      console.log('Skills Form Submitted:', this.skillsForm.value);
      this.skillsForm.reset();
    }
  }
}


