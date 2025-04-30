import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  displayedColumns: string[] = ['fullName', 'email', 'subject', 'message'];

  contactList = [
    {
      fullName: 'Usman Niaz',
      email: 'ali@example.com',
      subject: 'Feedback',
      message: 'Great job on the website!',
    },
    {
      fullName: 'Areeba Khalid',
      email: 'areebakhalid9854@example.com',
      subject: 'Bug Report',
      message: 'I found a bug on the project submission page.',
    },
    {
      fullName: 'Imran ali',
      email: 'john@example.com',
      subject: 'Support',
      message: 'How can I reset my password?',
    },
  ];
}
