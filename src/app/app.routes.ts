import { Routes } from '@angular/router';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./components/services/services.component').then(m => m.ServicesComponent),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./components/projects/projects.component').then(m => m.ProjectsComponent),
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./components/skills/skills.component').then(m => m.SkillsComponent),
  },
  {
    path: 'experience',
    loadComponent: () =>
      import('./components/experience/experience.component').then(m => m.ExperienceComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./components/contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: 'project-detail/:id',
    loadComponent: () => import('./components/project-detail/project-detail.component').then(m => m.ProjectDetailComponent)
  },
  

  

  {
    path: '**',
    redirectTo: '',
  },
];
