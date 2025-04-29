import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router'; 

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  showAll = false;

  projects = [
    {
      title: 'Food recipes',
      description: 'A dynamic and responsive Angular 19 application for managing food recipes with Firebase, PrimeNG, Tailwind, and multilingual support.',
      imgSrc: 'assets/images/food recipes.PNG',
      category: 'Angular Design',
      projectUrl: 'https://food-recipes-bice.vercel.app/',
      technologies: ['Angular', 'Firebase', 'Tailwind', 'i18n']
    },
    {
      title: 'Employee Management System',
      description: 'An Employee Management System (EMS) developed using Angular and local storage is a dynamic web application designed to track employee details.',
      imgSrc: 'assets/images/employee.PNG',
      category: 'UI-UX Design',
      projectUrl: 'https://employee-management-system-nine-blush.vercel.app/',
      technologies: ['Angular', 'Local Storage', 'Responsive Design']
    },
    {
      title: 'Note Taking App',
      description: 'A user-friendly Note-Taking App built with Angular 19 and Tailwind CSS. This app allows users to create, edit, and delete notes effortlessly.',
      imgSrc: 'assets/images/Note taking app.PNG',
      category: 'Web Application',
      projectUrl: 'https://note-taking-app-six-inky.vercel.app/',
      technologies: ['Angular 19', 'Tailwind CSS', 'CRUD']
    },
    {
      title: 'Courses Management System',
      description: 'A Courses Management System built with Angular, allowing users to add, view, and delete courses, demonstrating basic CRUD operations using Reactive Forms.',
      imgSrc: 'assets/images/courses.PNG',
      category: 'Web Application',
      projectUrl: 'https://course-management-system-psi.vercel.app/',
      technologies: ['Angular', 'Reactive Forms']
    },
    {
      title: 'Weather Gallery',
      description: 'A simple web project built using HTML and CSS, displaying a collection of weather-themed images in a visually appealing gallery format.',
      imgSrc: 'assets/images/gallery.PNG',
      category: 'UI Design',
      projectUrl: 'https://course-management-system-psi.vercel.app/',
      technologies: ['HTML', 'CSS']
    },
    {
      title: 'Internationalization (i18n)',
      description: 'Implemented multilingual support in an Angular 19 application using the i18n feature to display content in multiple languages like English and Urdu.',
      imgSrc: 'assets/images/i18n.PNG',
      category: 'UI Design',
      projectUrl: 'https://internationalization-three.vercel.app/',
      technologies: ['Angular 19', 'i18n']
    },
    { 
      title: 'Cathub',
      description: 'Simple and stylish web project built using HTML and CSS, designed as a creative landing page. It features a clean layout, responsive design, and modern UI elements.',
      imgSrc: 'assets/images/cathub.PNG',
      category: 'UI Design',
      projectUrl: 'https://catch-hub.vercel.app/',
      technologies: ['HTML', 'CSS', 'Responsive']
    },
    { 
      title: 'NEXCENT',
      description: 'Nexcent is a frontend-only web application developed using Angular as a learning project. It is designed to explore Angular’s fundamental concepts, component-based structure, and styling techniques',
      imgSrc: 'assets/images/nexcent.PNG',
      category: 'UI Design',
      projectUrl: 'https://nexcent-green.vercel.app/',
      technologies: ['Angular']
    },
    { 
      title: 'Static Portfolio',
      description: 'This is a personal portfolio website built with Angular, designed to showcase my skills, projects, and experience as an Angular developer.',
      imgSrc: 'assets/images/portfolio.PNG',
      category: 'UI Design',
      projectUrl: 'https://areeba-portfolio-wwfu.vercel.app/',
      technologies: ['Angular', 'Tailwind']
    }
  ];

  constructor(private router: Router) {}

  get visibleProjects() {
    return this.showAll ? this.projects : this.projects.slice(0, 6);
  }

  toggleProjects() {
    this.showAll = !this.showAll;
  }

  goToDetails(index: number) {
    this.router.navigate(['/project-detail', index]);
  }
}
