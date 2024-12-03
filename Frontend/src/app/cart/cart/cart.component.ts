import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { OrderService } from '../../order/order.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule,CurrencyPipe,NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(private cartService: CartService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCart().subscribe({
      next: (res: any) => {
        debugger;
        this.cartItems = res.data;
      },
      error: (err: any) => {
        console.error('Error fetching cart items:', err);
      },
    });
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartItem(item);
    }
  }

  increaseQuantity(item: any): void {
    item.quantity++;
    this.updateCartItem(item);
  }

  updateCartItem(item: any): void {
    this.cartService.updateCart(item.productId, item.quantity).subscribe({
      next: () => {
        console.log('Cart item updated successfully.');
      },
      error: (err: any) => {
        console.error('Error updating cart item:', err);
      },
    });
  }

  removeFromCart(item: any): void {
    this.cartService.removeFromCart(item.productId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter((cartItem) => cartItem !== item);
      },
      error: (err: any) => {
        console.error('Error removing cart item:', err);
      },
    });
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe({
      next: () => {
        this.cartItems = [];
      },
      error: (err: any) => {
        console.error('Error clearing cart:', err);
      },
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  checkout(): void {
    // let test = {...this.cartItems, amount: this.getTotal()}
    // alert('Proceeding to checkout!'+ JSON.stringify(test));
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (window.confirm('Are you sure you want to checkout?')) {
      const orderItems = this.cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));

      this.orderService.placeOrder({ items: orderItems, totalAmount: this.getTotal() }).subscribe({
        next: (response: any) => {
          alert(response.message);
          this.clearCart();
          // this.router.navigate(['/user-dashboard']);
        },
        error: (err: any) => {
          console.error('Failed to place order:', err);
          alert('Failed to place order. Please try again.');
        },
      });
    }
  }
}
