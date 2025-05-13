import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FirebaseService } from '../Firebase/firebase-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'email', 'subject', 'message', 'delete'];
  contactList: any[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const contactId = params['id'];
      const state = history.state;

      if (contactId && state.singleContact) {
        // If a specific contact ID and state is provided
        this.contactList = [state.singleContact];
      } else {
        // Load all contacts
        this.loadAllContacts();
      }
    });
  }

  loadAllContacts() {
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
