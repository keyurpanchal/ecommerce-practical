import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.credentials).subscribe({
      next: response => {
        alert('Login successful!');
        const isAdmin = this.authService.isAdmin();
        if (isAdmin) {
          alert('Welcome Admin!');
          this.router.navigate(['/admin-dashboard']);
        } else {
          alert('Welcome User!');
          this.router.navigate(['/user-dashboard']); 
        }
      },
      error: error => {
        alert('Login failed!');
      }
    });
  }
}
