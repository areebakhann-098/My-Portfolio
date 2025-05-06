import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../admin/Firebase/firebase-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class ExperienceComponent implements OnInit {
  experienceList: any[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.getDocuments('Experience').subscribe({
      next: (data) => {
        this.experienceList = data.map(exp => ({
          ...exp,
          fromDate: this.convertToDate(exp['fromDate']),
          toDate: this.convertToDate(exp['toDate'])
        }));
      },
      error: (err) => console.error('Error fetching experience data:', err)
    });
  }
  
  convertToDate(date: any): Date {
    // Firestore Timestamp object
    if (date?.seconds) {
      return new Date(date.seconds * 1000);
    }
    // ISO string
    if (typeof date === 'string' || date instanceof String) {
      return new Date(date as string);
    }
    // Already a Date object
    return date;
  }
}  
