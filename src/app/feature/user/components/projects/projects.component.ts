import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FirebaseService } from '../../../admin/Firebase/firebase-service.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  showAll = false;
  projects = signal<any[]>([]); // Angular Signal

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  ngOnInit() {
    this.firebaseService.getDocuments('projects').subscribe((data) => {
      this.projects.set(data);
    });
  }

  get visibleProjects() {
    return this.showAll ? this.projects() : this.projects().slice(0, 6);
  }

  toggleProjects() {
    this.showAll = !this.showAll;
  }

  goToDetails(project: any) {
    this.router.navigate(['/project-detail', project.id]);
  }
}
