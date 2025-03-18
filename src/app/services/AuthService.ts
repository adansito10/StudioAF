import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://192.168.1.70:3000/api'; // URL de tu backend

  constructor(private http: HttpClient, private storage: Storage) {
    this.initStorage();
  }

  // Inicializar el almacenamiento
  private async initStorage() {
    await this.storage.create();
  }

  // Registro de usuario
  register(nombre: string, correo: string, contrasena: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/usuarios`, { nombre, correo, contrasena })
      .pipe(
        catchError((error) => {
          console.error('Error en registro:', error);
          return throwError(error);
        })
      );
  }

  // Inicio de sesión
  login(correo: string, contrasena: string): Observable<string> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, { correo, contrasena })
      .pipe(
        map((response) => {
          const token = response.token;
          this.storage.set('jwt_token', token); // Guardar el token en el almacenamiento local
          return token;
        }),
        catchError((error) => {
          console.error('Error en login:', error);
          return throwError(error);
        })
      );
  }

  // Obtener el token almacenado
  async getToken(): Promise<string | null> {
    return await this.storage.get('jwt_token');
  }

  // Cerrar sesión
  async logout(): Promise<void> {
    await this.storage.remove('jwt_token');
  }
}