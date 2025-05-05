import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../admin/Firebase/firebase-service.service'; // Correct path
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  heroDataList: any[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.getDocuments('HeroInfo').subscribe({
      next: (data) => {
        this.heroDataList = data;
      },
      error: (err) => {
        console.error('Error fetching hero data:', err);
      }
    });
    
  }
}
