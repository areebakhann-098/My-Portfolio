import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    @Input() MenuOpen: boolean = true; // <-- Add this line

  userLogo = 'assets/images/logo1.jpg';  // Path to logo image
  userImage = 'assets/images/selfi.jpeg';  // Path to user profile image
  userName = 'Areeba';
  
  sideBarOpation = [
        { label: 'dashboard', route: '/admin/dasboard', icon: 'show_chart' },
    { label: 'Profile', route: '/admin/profile', icon: 'person' },
    { label: 'Hero Section', route: '/admin/hero', icon: 'home' },
    { label: 'About', route: '/admin/about', icon: 'info' },
    { label: 'Experience', route: '/admin/experience', icon: 'work' },
    { label: 'Skills', route: '/admin/skills', icon: 'star' },
    { label: 'Projects', route: '/admin/projects', icon: 'folder' },
    { label: 'Contact', route: '/admin/contact', icon: 'contact_mail' },
    { label: 'Services', route: '/admin/services', icon: 'miscellaneous_services' },
  ];

 
}
