import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, catchError } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

// auth service
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.tokenSubject.next(localStorage.getItem('token'));
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        debugger
        localStorage.setItem('token', response.data.token);
        this.tokenSubject.next(response.token);
        return response;
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);

  }

  get token(): string | null {
    return this.tokenSubject.value;
  }

  getDecodedToken(): any {
    const token = localStorage.getItem('token');
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  isAdmin(): boolean {
    const decodedToken = this.getDecodedToken();
    if(decodedToken?.role === 'admin'){
      return true;
    }
    return false;
  }
}
