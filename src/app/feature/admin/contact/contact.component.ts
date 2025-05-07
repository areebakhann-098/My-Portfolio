import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FirebaseService } from '../Firebase/firebase-service.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'email', 'subject', 'message'];
  contactList: any[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.firebaseService.getDocuments('contacts').subscribe({
      next: (data) => {
        this.contactList = data;
      },
      error: (err) => console.error('Failed to fetch contacts:', err)
    });
  }
}
