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
  // Add 'delete' to the displayedColumns array
  displayedColumns: string[] = ['fullName', 'email', 'subject', 'message', 'delete']; 
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

  deleteContact(contactId: string): void {
    if (confirm('Are you sure you want to delete this contact message?')) {
      this.firebaseService.deleteDocument('contacts', contactId).subscribe({
        next: () => {
          this.contactList = this.contactList.filter(contact => contact.id !== contactId);
          alert('Contact deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting contact:', err);
          alert('Error deleting contact');
        }
      });
    }
  }
}
