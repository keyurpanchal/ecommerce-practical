import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  orders: any[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (response) => {
        if (response.success) {
          this.orders = response.data;
        } else {
          this.error = 'Failed to load orders';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'An error occurred while fetching orders';
        this.loading = false;
      },
    });
  }
}
