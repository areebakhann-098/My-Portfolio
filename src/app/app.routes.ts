import { Routes } from '@angular/router';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HeroComponent } from './feature/admin/hero/hero.component';
import { AboutComponent } from './feature/admin/about/about.component';
import { ProjectsComponent } from './feature/admin/projects/projects.component';
import { SkillsComponent } from './feature/admin/skills/skills.component';
import { ExperienceComponent } from './feature/admin/experience/experience.component';
import { ServicesComponent } from './feature/admin/services/services.component';
import { ProfileComponent } from './feature/admin/profile/profile.component';
import { ContactComponent } from './feature/admin/contact/contact.component';
import { AuthGuard } from './auth/login.guard';
import { LoginComponent } from './core/login/login.component';
import { DashboardComponent } from './feature/admin/dashboard/dashboard.component';

export const routes: Routes = [
  // User front-end
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      { path: '', loadComponent: () => import('./feature/user/components/home/home.component').then(m => m.HomeComponent) },
      { path: 'about', loadComponent: () => import('./feature/user/components/about/about.component').then(m => m.AboutComponent) },
      { path: 'services', loadComponent: () => import('./feature/user/components/services/services.component').then(m => m.ServicesComponent) },
      { path: 'projects', loadComponent: () => import('./feature/user/components/projects/projects.component').then(m => m.ProjectsComponent) },
      { path: 'skills', loadComponent: () => import('./feature/user/components/skills/skills.component').then(m => m.SkillsComponent) },
      { path: 'experience', loadComponent: () => import('./feature/user/components/experience/experience.component').then(m => m.ExperienceComponent) },
      { path: 'contact', loadComponent: () => import('./feature/user/components/contact/contact.component').then(m => m.ContactComponent) },
      { path: 'project-detail/:id', loadComponent: () => import('./feature/user/components/project-detail/project-detail.component').then(m => m.ProjectDetailComponent) },
    ]
  },

  // Admin login (public)
  {
    path: 'admin/login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },

  // Admin area (no guards for now)
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
     
      { path: 'hero', component: HeroComponent },
      { path: 'about', component: AboutComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'experience', component: ExperienceComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'contact', component: ContactComponent },

      // Redirect bare /admin to hero (or any default dashboard page)
{ path: '', component: DashboardComponent },
{ path: 'dashboard', component: DashboardComponent },
    ]
  },

  // Default redirect to admin login
  {
    path: '',
    redirectTo: 'admin/login',
    pathMatch: 'full'
  },

  // Wildcard
  {
    path: '**',
    redirectTo: 'admin/login'
  }
];
