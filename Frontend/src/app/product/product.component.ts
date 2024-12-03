import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Product } from '../models/product.model';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf,NgFor, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  products: any[] = [];
  formProduct: any = {
    name: '',
    category: '',
    price: 0,
    description: '',
    imageUrl: '',
  };
  formVisible = false;
  isEditing = false;
  selectedProduct: any = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((res: any) => {
      this.products = res.data;
    });
  }

  openAddProductForm() {
    this.formProduct = {
      name: '',
      category: '',
      price: 0,
      description: '',
      imageUrl: ''
    };
    this.formVisible = true;
    this.isEditing = false;
  }

  openEditModal(product: any): void {
    this.formProduct = { ...product };
    this.formVisible = true;
    this.isEditing = true;
  }

  // initAddProduct() {
  //   this.selectedProduct = null;
  //   this.formProduct = {
  //     name: '',
  //     category: '',
  //     price: 0,
  //     description: '',
  //     imageUrl: ''
  //   };
  // }

  updateProduct(): void {
    if (this.selectedProduct) {
      this.productService.updateProduct(this.selectedProduct._id, this.selectedProduct).subscribe(() => {
        alert('Product updated successfully');
        this.selectedProduct = null;
        this.loadProducts();
    });
    }
  }

  cancelEdit(): void {
    // this.selectedProduct = null;
    // this.resetForm();
    this.formVisible = false;
    this.isEditing = false;
  }

  // resetForm() {
  //   this.formProduct = {
  //     name: '',
  //     category: '',
  //     price: 0,
  //     description: '',
  //     imageUrl: '',
  //   };
  // }

  submitProduct() {
    if (this.isEditing) {
      this.productService.updateProduct(this.selectedProduct._id, this.selectedProduct).subscribe(() => {
        alert('Product updated successfully');
        this.selectedProduct = null;
        this.loadProducts();
        this.cancelEdit();
    });
    } else {
      this.productService.createProduct(this.formProduct).subscribe({
        next: (response: any) => {
          this.products.push(response.data); 
          console.log('Product added successfully:', response.data);
          this.loadProducts();
          this.cancelEdit();
        },
        error: (err) => console.error('Failed to add product:', err),
      });
    }
  }

  // addProduct() {
  //   this.productService.createProduct(this.formProduct).subscribe({
  //     next: (response: any) => {
  //       this.products.push(response.data); 
  //       console.log('Product added successfully:', response.data);
  //       this.resetForm();
  //     },
  //     error: (err) => console.error('Failed to add product:', err),
  //   });
  // }



  confirmDelete(product: any): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.deleteProduct(product);
    }
  }

  deleteProduct(product: any): void {
    this.productService.deleteProduct(product._id).subscribe(() => {
      alert('Product deleted successfully');
      this.loadProducts();
    });
  }
  


}
