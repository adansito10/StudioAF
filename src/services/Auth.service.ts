import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface User {
  nombre: string;
  correo: string;
  contrasena: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://192.168.1.70:3000/api'; // URL de tu backend

  constructor(private http: HttpClient) {}

  register(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/register`, user).pipe(
      tap((response) => {
        if (response.success && response.token) {
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }

  login(credentials: { correo: string; contrasena: string }): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response.success && response.token) {
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}