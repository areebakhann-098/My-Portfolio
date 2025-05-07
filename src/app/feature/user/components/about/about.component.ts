import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FirebaseService } from '../../../admin/Firebase/firebase-service.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  profileImage: string = ''; // URL for the profile image
  heading: string = ''; // Title or heading for the about section
  paragraphs: string[] = []; // Array of paragraphs
  socialLinks: { icon: string, url: string }[] = []; // Social links
  cvFile: string = ''; // CV file URL
  isDataLoaded: boolean = false; // Flag to check if the data is loaded

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.fetchAboutData();
  }

  fetchAboutData(): void {
    // Fetch the data from Firestore
    this.firebaseService.getDocuments('about').subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const aboutData = data[0]; // Assuming only one document for "about"
          
          // Use bracket notation to access properties
          this.heading = aboutData['title']; // Access title using bracket notation
          this.paragraphs = aboutData['description'].split('\n'); // Assuming description is stored as a single string with newlines
          this.socialLinks = [
            { icon: 'fab fa-facebook-f', url: aboutData['facebook'] },
            { icon: 'fab fa-instagram', url: aboutData['instagram'] },
            { icon: 'fab fa-linkedin-in', url: aboutData['linkedin'] },
            { icon: 'fab fa-github', url: aboutData['github'] },
            { icon: 'fab fa-fiverr', url: aboutData['fiverr'] }
          ];
          this.profileImage = aboutData['photoUrl']; // Access photoUrl using bracket notation
          this.cvFile = aboutData['cvFileUrl']; // Access cvFileUrl using bracket notation
        }
        this.isDataLoaded = true; // Mark the data as loaded
      },
      error: (err) => {
        console.error('Error fetching about data:', err);
        this.isDataLoaded = true; // Mark as loaded even if there was an error
      }
    });
  }
}  