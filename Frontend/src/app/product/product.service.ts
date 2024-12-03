import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getProductsWithFilters(page: number, limit: number): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.http.get<any>(this.apiUrl, { params });
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, product);
  }


}
