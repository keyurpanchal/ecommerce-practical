import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,NgIf,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  user = {  email: '', password: '' };

  constructor(private authService: AuthService) {}

  register(): void {
    debugger
    this.authService.register(this.user).subscribe({
      next: (response) => {
        alert('Registration successful!');
      },
      error: (error) => {
        alert('Registration failed!');
      },
    });
  }
}
