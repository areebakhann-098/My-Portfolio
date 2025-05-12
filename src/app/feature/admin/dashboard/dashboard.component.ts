import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { FirebaseService } from '../Firebase/firebase-service.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  selectedSection: string | null = null;

  sections = [
    { key: 'skills', title: 'Skills', icon: 'code', color: '#FCE4EC', count: 0 },
    { key: 'projects', title: 'Projects', icon: 'work', color: '#FFEBEE', count: 0 },
    { key: 'contact', title: 'Contact', icon: 'contact_mail', color: '#E8F5E9', info: '' }
  ];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  loadDashboardData(): void {
     // Try loading from localStorage first
  const storedSections = localStorage.getItem('dashboardCounts');
  if (storedSections) {
    this.sections = JSON.parse(storedSections);
  }
    this.firebaseService.getDocuments('SkillsInfo').subscribe((skills) => {
      const index = this.sections.findIndex(s => s.key === 'skills');
      if (index !== -1) this.sections[index].count = skills.length;
    });

    this.firebaseService.getDocuments('projects').subscribe((projects) => {
      const index = this.sections.findIndex(s => s.key === 'projects');
      if (index !== -1) this.sections[index].count = projects.length;
    });

    this.firebaseService.getDocuments('contacts').subscribe((contacts) => {
      const index = this.sections.findIndex(s => s.key === 'contact');
      if (index !== -1) this.sections[index].count = contacts.length;
    });
  }
  updateSectionCount(key: string, count: number): void {
  const index = this.sections.findIndex(s => s.key === key);
  if (index !== -1) {
    this.sections[index].count = count;
    localStorage.setItem('dashboardCounts', JSON.stringify(this.sections));
  }
}

  renderChart(): void {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
      labels: labels,
      datasets: [{
        label: 'Portfolio Overview',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };

    new Chart('myChart', {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
