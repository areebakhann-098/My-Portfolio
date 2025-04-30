import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {


  expertiseDescription = 'I build fast, responsive, and scalable web applications using Angular. From user interfaces to integrating real-time data with backend services, I focus on writing clean, maintainable code that delivers smooth user experiences. I\'m experienced in working with modern frontend tools, component libraries like PrimeNG, and technologies such as Firebase, RxJS, and Angular Signals.';

  expertiseAdditionalInfo = 'I’m always eager to learn, grow, and contribute to meaningful projects. I’m currently open to new opportunities and excited to start working.';

  expertiseCards = [
    {
      title: 'User Experience (UX)',
      description: 'I focus on making websites easy, enjoyable, and useful for people. I think about how users feel when they visit a website and make sure everything works smoothly and logically.',
      borderClass: 'border-purple-600'
    },
    {
      title: 'User Interface (UI)',
      description: 'I design clean and attractive layouts that look good on all devices. I pay attention to colors, fonts, and spacing to make the website look professional and user-friendly.',
      borderClass: 'border-purple-600'
    },
    {
      title: 'Web Development',
      description: 'I build websites using modern tools like Angular. I write code that turns designs into real, working websites with features like forms, animations, and real-time updates.',
      borderClass: 'border-purple-600'
    }
  ];
}
