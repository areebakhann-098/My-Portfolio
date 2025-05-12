import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router'; // 👈 Add this
import { FirebaseService } from '../../feature/admin/Firebase/firebase-service.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router 
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Check if the user is already authenticated from localStorage
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.router.navigate(['/admin']);  // Redirect to admin dashboard if logged in
    }
  }

  onLogin() {
    const { email, password } = this.loginForm.value;
    this.firebaseService.login(email, password)
      .then(() => {
        // Set 'isLoggedIn' flag in localStorage after successful login
        localStorage.setItem('isLoggedIn', 'true');
        alert('Login successful!');
        this.router.navigate(['/admin']);  // ✅ Redirect to dashboard
      })
      .catch((error) => {
        alert('Login failed: ' + error.message);
      });
  }
}
