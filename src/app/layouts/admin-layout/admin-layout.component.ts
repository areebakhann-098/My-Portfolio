import { Component } from '@angular/core';
import { SidebarComponent } from '../../feature/admin/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../feature/admin/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  imports: [SidebarComponent, NavbarComponent, RouterOutlet, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  MenuOpen = true;

toggleSidebar() {
  this.MenuOpen = !this.MenuOpen;
}


}
