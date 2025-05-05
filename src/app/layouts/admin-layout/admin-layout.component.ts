import { Component } from '@angular/core';
import { SidebarComponent } from '../../feature/admin/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../feature/admin/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [SidebarComponent, NavbarComponent, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
