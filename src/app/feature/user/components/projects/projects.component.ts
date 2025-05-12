import { Component, OnInit, signal, computed } from '@angular/core';
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
  showAll = signal(false);
  projects = signal<any[]>([]);

  // Computed signal to update visible projects based on showAll
  visibleProjects = computed(() =>
    this.showAll() ? this.projects() : this.projects().slice(0, 3)
  );

  constructor(private firebaseService: FirebaseService, private router: Router) {}

  ngOnInit() {
    this.firebaseService.getDocuments('projects').subscribe((data) => {
      this.projects.set(data);
    });
  }

  toggleProjects() {
    this.showAll.set(!this.showAll());
  }

  goToDetails(project: any) {
    this.router.navigate(['/project-detail', project.id]);
  }
}
