import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import AOS from 'aos'
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'My-Portfolio';
  ngOnInit() {
    AOS.init({
      duration: 1000,  // Animation duration
      easing: 'ease-in-out',  // Animation easing
      delay: 200,  // Run the animation once when it comes into view
    });
  }
  
}





