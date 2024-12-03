import { Component } from '@angular/core';
import { ProductListComponent } from '../../product/product-list/product-list.component';
import { AuthService } from '../../auth/auth.service';
import { CartComponent } from '../../cart/cart/cart.component';
import { OrderHistoryComponent } from '../../order/order-history/order-history.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [ProductListComponent,CartComponent, OrderHistoryComponent, NgIf, NgFor],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

  tabs = [
    { id: 'products', label: 'Products' },
    { id: 'cart', label: 'Cart' },
    { id: 'orders', label: 'Order History' },
  ];

  activeTab = 'products'; 

  constructor(private authService: AuthService){}
  logout(): void {
    this.authService.logout();
  }
}
