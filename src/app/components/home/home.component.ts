import { Component, ContentChild } from '@angular/core';
import { SkillsComponent } from "../skills/skills.component";
import { NavbarComponent } from '../navbar/navbar.component';
import { HeroComponent } from '../hero/hero.component';
import { ExperienceComponent } from '../experience/experience.component';
import { ContactComponent } from '../contact/contact.component';
import { ProjectsComponent } from '../projects/projects.component';
import { AboutComponent } from "../about/about.component";
import { ServicesComponent } from '../services/services.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, AboutComponent, ExperienceComponent, ServicesComponent, ContactComponent, ProjectsComponent, SkillsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
