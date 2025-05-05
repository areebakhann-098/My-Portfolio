import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';

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
    MatTabsModule
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

  previewImage: string | ArrayBuffer | null = null;
  experienceList: any[] = [];

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.experienceForm.get('image')?.setValue(file);
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submitExperienceForm() {
    if (this.experienceForm.valid) {
      const formData = this.experienceForm.value;
      const experience = {
        title: formData.title,
        description: formData.description,
        fromDate: formData.fromDate,
        toDate: formData.toDate,
        imageUrl: this.previewImage
      };

      this.experienceList.push(experience);
      this.experienceForm.reset();
      this.previewImage = null;
    }
  }
}
