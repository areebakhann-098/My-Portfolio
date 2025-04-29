import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  experiences = [
    {
      title: 'Graphic Designing',
      description: 'I have experience in graphic designing, working with tools like Adobe Photoshop, Illustrator, and Canva to create visually appealing designs.',
      image: 'assets/images/graphic designing.jpg',
      duration: 'Oct - Dec 2024',
      badgeClass: 'bg-indigo-100 text-indigo-800'
    },
    {
      title: 'Teaching',
      description: 'I have experience in teaching, guiding students in web development, programming languages, and design principles.',
      image: 'assets/images/teach.jpg',
      duration: 'June - Oct 2024',
      badgeClass: 'bg-green-100 text-green-800'
    },
    {
      title: 'Internship',
      description: 'I am currently working as a Web Development Intern at Beetechnica, where I am gaining practical experience in designing and developing responsive and interactive web applications.',
      image: 'assets/images/profile7.jpg',
      duration: 'Feb - sept-2025',
      badgeClass: 'bg-green-100 text-green-800'
    }
  ];
}


