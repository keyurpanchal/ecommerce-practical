import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:3000/api/orders'; 

  constructor(private http: HttpClient) {}

  placeOrder(orderData: { items: { productId: string; quantity: number }[], totalAmount: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, orderData);
  }

  getOrders(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
