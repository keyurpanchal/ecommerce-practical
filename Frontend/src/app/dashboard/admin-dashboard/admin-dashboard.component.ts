import { Component } from '@angular/core';
import { ProductComponent } from '../../product/product.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(private authService: AuthService){}
  logout(): void {
    this.authService.logout();
  }
}
