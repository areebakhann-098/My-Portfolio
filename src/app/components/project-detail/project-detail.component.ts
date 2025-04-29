import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent {
  project: any;

  // Static project list (same as in ProjectsComponent, with `technology`)
  projects = [
    {
      title: 'Food recipes',
      description: 'A dynamic and responsive Angular 19 application for managing food recipes with Firebase, PrimeNG, Tailwind, and multilingual support.',
      imgSrc: 'assets/images/food recipes.PNG',
      category: 'Angular Design',
      technology: 'Angular 19, Firebase, PrimeNG, Tailwind, i18n'
    },
    {
      title: 'Employee Management System',
      description: 'An Employee Management System (EMS) developed using Angular and local storage is a dynamic web application designed to track employee details.',
      imgSrc: 'assets/images/employee.PNG',
      category: 'UI-UX Design',
      technology: 'Angular 19, LocalStorage, Tailwind'
    },
    {
      title: 'Note Taking App',
      description: 'A user-friendly Note-Taking App built with Angular 19 and Tailwind CSS. This app allows users to create, edit, and delete notes effortlessly.',
      imgSrc: 'assets/images/Note taking app.PNG',
      category: 'Web Application',
      technology: 'Angular 19, Tailwind CSS'
    },
    {
      title: 'Courses Management System',
      description: 'A Courses Management System built with Angular, allowing users to add, view, and delete courses, demonstrating basic CRUD operations using Reactive Forms.',
      imgSrc: 'assets/images/courses.PNG',
      category: 'Web Application',
      technology: 'Angular, Reactive Forms, Tailwind'
    },
    {
      title: 'Weather Gallery',
      description: 'A simple web project built using HTML and CSS, displaying a collection of weather-themed images in a visually appealing gallery format.',
      imgSrc: 'assets/images/gallery.PNG',
      category: 'UI Design',
      technology: 'HTML, CSS'
    },
    {
      title: 'Internationalization (i18n)',
      description: 'Implemented multilingual support in an Angular 19 application using the i18n feature to display content in multiple languages like English and Urdu.',
      imgSrc: 'assets/images/i18n.PNG',
      category: 'UI Design',
      technology: 'Angular 19, i18n'
    },
    { 
      title: 'Cathub',
      description: 'Simple and stylish web project built using HTML and CSS, designed as a creative landing page. It features a clean layout, responsive design, and modern UI elements.',
      imgSrc: 'assets/images/cathub.PNG',
      category: 'UI Design',
      technology: 'HTML, CSS'
    },
    { 
      title: 'NEXCENT',
      description: 'Nexcent is a frontend-only web application developed using Angular as a learning project. It is designed to explore Angular’s fundamental concepts, component-based structure, and styling techniques',
      imgSrc: 'assets/images/nexcent.PNG',
      category: 'UI Design',
      technology: 'Angular, Tailwind'
    },
    { 
      title: 'Static Portfolio',
      description: 'This is a personal portfolio website built with Angular, designed to showcase my skills, projects, and experience as an Angular developer.',
      imgSrc: 'assets/images/portfolio.PNG',
      category: 'UI Design',
      technology: 'Angular, Tailwind CSS'
    }
  ];

  constructor(private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    this.project = this.projects[Number(id)];
  }
}
