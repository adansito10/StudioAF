import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://192.168.1.70:3000/api';

  constructor(private http: HttpClient, private storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
  }

  register(nombre: string, correo: string, contrasena: string): Observable<any> {
    return this.http
      .post<{ user: { id: number; nombre: string; correo: string } }>(`${this.apiUrl}/usuarios`, { nombre, correo, contrasena })
      .pipe(
        map((response) => {
          if (response.user) {
            this.storage.set('userName', response.user.nombre);
            this.storage.set('userEmail', response.user.correo);
          }
          return response;
        }),
        catchError((error) => {
          console.error('Error en registro:', error);
          return throwError(error);
        })
      );
  }

  login(correo: string, contrasena: string): Observable<string> {
    return this.http
      .post<{ token: string; user: { id: number; nombre: string; correo: string } }>(`${this.apiUrl}/login`, { correo, contrasena })
      .pipe(
        map((response) => {
          const token = response.token;
          this.storage.set('jwt_token', token);
          if (response.user) {
            this.storage.set('userName', response.user.nombre);
            this.storage.set('userEmail', response.user.correo);
          }
          return token;
        }),
        catchError((error) => {
          console.error('Error en login:', error);
          return throwError(error);
        })
      );
  }

  async getToken(): Promise<string | null> {
    return await this.storage.get('jwt_token');
  }

  async getUserName(): Promise<string | null> {
    return await this.storage.get('userName');
  }

  // Añadimos el método para obtener el correo
  async getUserEmail(): Promise<string | null> {
    return await this.storage.get('userEmail');
  }

  async logout(): Promise<void> {
    await this.storage.remove('jwt_token');
    await this.storage.remove('userName');
    await this.storage.remove('userEmail');
  }
}