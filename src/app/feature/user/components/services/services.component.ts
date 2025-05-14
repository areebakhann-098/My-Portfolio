import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../admin/Firebase/firebase-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  servicesList: any[] = [];  // Array to hold fetched services from Firestore

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.fetchServices();
  }

  // Fetch services from Firebase Firestore
  fetchServices() {
    this.firebaseService.getDocuments('services').subscribe((services: any[]) => {
      this.servicesList = services;
    }, error => {
      console.error('Error fetching services:', error);
    });
  }
}
