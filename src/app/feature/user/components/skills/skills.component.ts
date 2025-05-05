import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { FirebaseService } from '../../../admin/Firebase/firebase-service.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  skills = signal<any[]>([]); // Signal-based reactivity

  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.getDocuments('SkillsInfo').subscribe({
      next: (data) => this.skills.set(data),
      error: (err) => console.error('Error fetching skills:', err)
    });
  }
}
