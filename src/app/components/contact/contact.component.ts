import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm!: FormGroup;

  formFields = [
    { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Enter your full name', validators: [Validators.required] },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email', validators: [Validators.required, Validators.email] },
    { label: 'Subject', name: 'subject', type: 'text', placeholder: 'Enter subject', validators: [Validators.required] },
    { label: 'Message', name: 'message', type: 'textarea', placeholder: 'Write your message', validators: [Validators.required] }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({});
    this.formFields.forEach(field => {
      this.contactForm.addControl(field.name, this.fb.control('', field.validators));
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Data:', this.contactForm.value);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
