import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Output() toggle = new EventEmitter<void>();

  dashboardTitle = 'Dashboard';
  userName = 'Areeba Khalid';
  userAvatar = 'assets/logoo.jpg';

  isMenuOpen = false;

  profileOpation = [
    { label: 'Profile', icon: 'person', route: '/admin/profile' },
    { label: 'Settings', icon: 'settings', route: '/admin/settings' },
    { label: 'Logout', icon: 'logout', route: '/logout' },
  ];

  onToggleClick() {
    this.toggle.emit();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
