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

  onToggleClick() {
    this.toggle.emit();
  }
}
