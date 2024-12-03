import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, NgFor } from '@angular/common';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule,NgFor,CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchQuery: string = '';
  categoryFilter: string = '';
  currentPage: number = 1;
  totalProducts: number = 0;
  productsPerPage: number = 10;
  productsPerPageOptions = [5, 10, 20, 50]; 

  constructor(private productService: ProductService, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProductsWithFilters(this.currentPage, this.productsPerPage).subscribe({
      next: (response: any) => {
        debugger
        this.products = response.data;
        this.totalProducts = response.data.length; 
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error fetching products', error);
      }
    }
    );
  }

  addToCart(productId: string, quantity: number): void {
    this.cartService.addToCart(productId, quantity).subscribe( {
      next: (response) => {
        alert('Product added to cart successfully! Refresh Page!');        
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
        alert('Failed to add product to cart.');
      } 
    }
    );
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  onProductsPerPageChange(): void {
    this.currentPage = 1; 
    this.loadProducts();
  }

  applyFilters(): void {
    let products = this.products;

    if (this.searchQuery) {
      products = products.filter(product => 
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    if (this.categoryFilter) {
      products = products.filter(product => 
        product.category.toLowerCase() === this.categoryFilter.toLowerCase()
      );
    }

    this.filteredProducts = products;
  }
}
