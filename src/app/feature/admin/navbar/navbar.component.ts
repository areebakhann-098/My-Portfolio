import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { FirebaseService } from '../Firebase/firebase-service.service';
import { MatBadgeModule } from '@angular/material/badge';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  @Output() toggle = new EventEmitter<void>();

  dashboardTitle = 'Dashboard';
  userName = 'Areeba Khalid';
  userAvatar = 'assets/images/profile5.jpg';

  profileOpation = [
    { label: 'Profile', icon: 'person', route: '/admin/profile' },
    { label: 'Settings', icon: 'settings', route: '/admin/settings' },
  ];

  contacts: any[] = [];
  contactCount = 0;

  constructor(private router: Router, private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.firebaseService.getDocuments('contacts').subscribe({
      next: (data) => {
        this.contacts = data;
        this.contactCount = data.length; // Optionally filter unread
      },
      error: (err) => console.error('Failed to fetch contacts:', err)
    });
  }

  onToggleClick() {
    this.toggle.emit();
  }

  logout() {
    this.firebaseService.logout();
    this.router.navigate(['/admin/login']);
  }

  profile() {
    this.router.navigate(['/admin/profile'], {
      state: { viewProfileOnly: true },
    });
  }

  user() {
    this.router.navigate(['/']);
  }

viewSingleContact(contact: any) {
  this.router.navigate(['/admin/contact'], {
    queryParams: { id: contact.id },
    state: { singleContact: contact }
  });
}


viewAllContacts() {
  this.router.navigate(['/admin/contact'], {
    queryParams: {}  // clears the 'id' param so all contacts will be shown
  });
}

goToContactPage() {
  this.router.navigate(['/admin/contact'], {
    queryParams: {},
    state: {}
  });
}


}
