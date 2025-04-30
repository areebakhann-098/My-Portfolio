import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})


export class HeroComponent {
  // Define the properties and logic here
  name: string = 'Areeba Khalid';
  title: string = 'Angular Developer';
  descriptionShort: string = 'A passionate Angular Developer focused on crafting modern, responsive, and user-centric web applications...';
  descriptionFull: string = `A passionate Angular Developer focused on crafting modern, responsive, and user-centric web applications. I specialize in Angular 19, and have hands-on expertise working with PrimeNG, TailwindCSS, Bootstrap, and SCSS to design clean, efficient, and highly interactive user interfaces.
  
  My technical skill set also includes Firebase integration, building robust solutions with REST APIs, and applying RxJS for seamless reactive programming. Additionally, I have experience in creating multilingual applications using ngx-translate, ensuring accessibility and usability across different languages.
  
  I am deeply committed to continuous learning and growth, always aiming to bring fresh ideas and dedication to every project I work on.`;

  showFullText: boolean = false; // Toggle variable

  // Method to toggle the text
  toggleText() {
    this.showFullText = !this.showFullText;
  }

  // Stats
  stats = [
    { title: '1 Y.', description: 'Experience' },
    { title: '20+', description: 'Project Completed' },
    { title: '58', description: 'Happy Clients' }
  ];

  // Profile image
  profileImage: string = 'assets/images/profile3.jpg';
}
