import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  profileImage = 'assets/images/profile.jpg';

  heading = 'I am Professional User Experience Designer';

  paragraphs = [
    `I specialize in building responsive, high-performance web applications using Angular 19. My experience includes real-time data updates, form validation, and Firebase integration. I develop multilingual apps with real-time functionality and image uploads for global users. I design visually appealing, responsive UIs using Bootstrap, PrimeNG, and TailwindCSS. My focus is on creating clean, maintainable, user-friendly applications with optimized performance.`,
    `I design and develop services for customers specializing creating stylish, modern websites, web services.`
  ];

  projectButton = {
    label: 'My Project',
    link: '/projects',
    fragment: 'projects'
  };

  cvButton = {
    label: 'Download CV',
    filePath: 'assets/images/CV.pdf',
    fileName: 'CV.pdf'
  };

  socialLinks = [
    { icon: 'fab fa-facebook-f', url: 'https://facebook.com/yourprofile' },
    { icon: 'fab fa-instagram', url: 'https://instagram.com/yourprofile' },
    { icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/areeba-khalid-03619b288/' },
    { icon: 'fab fa-github', url: 'https://github.com/areebakhann-098' },
    { icon: 'fas fa-envelope', url: 'mailto:areebakhalid9854@example.com' },
  ];
}
