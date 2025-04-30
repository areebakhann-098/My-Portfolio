import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,     
    MatListModule,     
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  userName = 'Areeba Khalid';
  userLogo = 'assets/logo1.jpg';
  showSidebar = false;

  isLargeScreen(): boolean {
    return window.innerWidth >= 1024;
  }

  links = [
    { label: 'Profile', path: '/admin/profile', icon: 'person' },
    { label: 'Hero Section', path: '/admin/hero', icon: 'home' },
    { label: 'About', path: '/admin/about', icon: 'info' },
    { label: 'Experience', path: '/admin/experience', icon: 'work' },
    { label: 'Skills', path: '/admin/skills', icon: 'star' },
    { label: 'Projects', path: '/admin/projects', icon: 'folder' },
    { label: 'Contact', path: '/admin/contact', icon: 'contact_mail' },
    { label: 'Services', path: '/admin/services', icon: 'miscellaneous_services' },
  ];

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}
