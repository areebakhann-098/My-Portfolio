import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  MenuOpen = true;  // Set default state to open
  userLogo = 'assets/images/logo1.jpg';  // Path to logo image
  userImage = 'assets/images/selfi.jpeg';  // Path to user profile image
  userName = 'Areeba';
  
  sideBarOpation = [
    { label: 'Profile', route: '/admin/profile', icon: 'person' },
    { label: 'Hero Section', route: '/admin/hero', icon: 'home' },
    { label: 'About', route: '/admin/about', icon: 'info' },
    { label: 'Experience', route: '/admin/experience', icon: 'work' },
    { label: 'Skills', route: '/admin/skills', icon: 'star' },
    { label: 'Projects', route: '/admin/projects', icon: 'folder' },
    { label: 'Contact', route: '/admin/contact', icon: 'contact_mail' },
    { label: 'Services', route: '/admin/services', icon: 'miscellaneous_services' },
  ];

  // Toggle sidebar visibility
  menuToggle() {
    this.MenuOpen = !this.MenuOpen;
  }
}
