import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { FirebaseService } from '../Firebase/firebase-service.service';

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
    MatTabsModule
  ],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {
  categoryOptions = ['Web Development', 'Mobile App', 'Machine Learning', 'UI/UX Design'];

  projectForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    shortDescription: new FormControl('', Validators.required),
    fullDescription: new FormControl('', Validators.required),
    image: new FormControl<string | null>(null),
    technologies: new FormControl('', Validators.required),
    projectLink: new FormControl('', Validators.required) // Add projectLink form control
  });

  imagePreview: string | ArrayBuffer | null = null;
  base64Image: string | null = null;
  isSubmitting = false;
  projectList: any[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.firebaseService.getDocuments('projects').subscribe({
      next: (data) => {
        this.projectList = data;
      },
      error: (err) => {
        console.error('Error fetching project data:', err);
      }
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert('Image size exceeds 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.base64Image = reader.result as string;
        this.projectForm.patchValue({ image: this.base64Image });
        this.projectForm.get('image')?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    }
  }

  async submitProjectForm(): Promise<void> {
    if (this.projectForm.valid && this.base64Image) {
      this.isSubmitting = true;

      const formValue = this.projectForm.value;

      const technologiesArray = formValue.technologies
        ? formValue.technologies.split(',').map((tech: string) => tech.trim())
        : [];

      const projectData = {
        title: formValue.title,
        category: formValue.category,
        shortDescription: formValue.shortDescription,
        fullDescription: formValue.fullDescription,
        imageUrl: formValue.image,
        technologies: technologiesArray,
        projectLink: formValue.projectLink // Store project link
      };

      this.firebaseService.addDocument('projects', projectData).subscribe({
        next: () => {
          this.isSubmitting = false;
          alert('Project added successfully!');
          this.loadProjects();
          this.projectForm.reset();
          this.imagePreview = null;
          this.base64Image = null;
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error(err);
          alert('Error saving project.');
        }
      });
    } else {
      alert('Please fill all fields and upload an image.');
    }
  }
  deleteProject(projectId: string): void {
  const confirmDelete = confirm('Are you sure you want to delete this project?');
  if (!confirmDelete) return;

  this.firebaseService.deleteDocument('projects', projectId).subscribe({
    next: () => {
      alert('Project deleted successfully.');
      this.loadProjects();
    },
    error: (err) => {
      console.error('Error deleting project:', err);
      alert('Failed to delete project.');
    }
  });
}

}
