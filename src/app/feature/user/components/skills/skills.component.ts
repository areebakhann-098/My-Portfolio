import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  skills = [
    { name: 'HTML', image: 'assets/images/HTML1.jpg' },
    { name: 'CSS', image: 'assets/images/CSS.jpg' },
    { name: 'C++', image: 'assets/images/C++.jpg' },
    { name: 'JavaScript', image: 'assets/images/js.jpg' },
    { name: 'Bootstrap', image: 'assets/images/bootstrap.jpg' },
    { name: 'Visual Studio', image: 'assets/images/visual studio.jpg' },
    { name: 'Adobe Photoshop', image: 'assets/images/adobe.jpg' },
    { name: 'Canva', image: 'assets/images/canva.jpg' },
    { name: 'Figma', image: 'assets/images/figma.jpg' },
    { name: 'CorelDraw', image: 'assets/images/coreldraw.jpg' },
    { name: 'TypeScript', image: 'assets/images/typescript.jpg' },
    { name: 'GitHub', image: 'assets/images/github.jpg' },
    { name: 'TailwindCSS', image: 'assets/images/tailwindcss.jpg' },
    { name: 'Angular', image: 'assets/images/angular1.jpg' },
    { name: 'SCSS', image: 'assets/images/scss.jpg' },
    { name: 'Firebase', image: 'assets/images/firebase.jpg' },
    { name: 'Git', image: 'assets/images/git.jpg' }
  ];
}
