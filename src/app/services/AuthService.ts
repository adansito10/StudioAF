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

    register(nombre: string, correo: string, contrasena: string, imagen: string = ''): Observable<any> {
        return this.http
            .post<{ user: { id: number; nombre: string; correo: string; imagen: string } }>(`${this.apiUrl}/usuarios`, { nombre, correo, contrasena, imagen })
            .pipe(
                map((response) => {
                    if (response.user) {
                        this.storage.set('userId', response.user.id.toString());
                        this.storage.set('userName', response.user.nombre);
                        this.storage.set('userEmail', response.user.correo);
                        this.storage.set('userImage', response.user.imagen || '');
                    }
                    return response;
                }),
                catchError((error) => {
                    console.error('Error en registro:', error);
                    return throwError(() => new Error(error.error?.message || 'Error al registrar usuario'));
                })
            );
    }

    login(correo: string, contrasena: string): Observable<string> {
        return this.http
            .post<{ token: string; user: { id: number; nombre: string; correo: string; imagen: string } }>(`${this.apiUrl}/login`, { correo, contrasena })
            .pipe(
                map((response) => {
                    const token = response.token;
                    this.storage.set('jwt_token', token);
                    if (response.user) {
                        this.storage.set('userId', response.user.id.toString());
                        this.storage.set('userName', response.user.nombre);
                        this.storage.set('userEmail', response.user.correo);
                        this.storage.set('userImage', response.user.imagen || '');
                    }
                    return token;
                }),
                catchError((error) => {
                    console.error('Error en login:', error);
                    return throwError(() => new Error(error.error?.message || 'Error al iniciar sesión'));
                })
            );
    }

    async getToken(): Promise<string | null> {
        return await this.storage.get('jwt_token');
    }

    async getUserId(): Promise<string | null> {
        return await this.storage.get('userId');
    }

    async getUserName(): Promise<string | null> {
        return await this.storage.get('userName');
    }

    async getUserEmail(): Promise<string | null> {
        return await this.storage.get('userEmail');
    }

    async getProfilePicture(): Promise<string | null> {
        return await this.storage.get('userImage');
    }

    async logout(): Promise<void> {
        await this.storage.remove('jwt_token');
        await this.storage.remove('userId');
        await this.storage.remove('userName');
        await this.storage.remove('userEmail');
        await this.storage.remove('userImage');
    }

    // Método para actualizar el perfil del usuario
    updateProfile(userId: string, nombre: string, correo: string, imagen: string): Observable<any> {
        return this.http
            .put(`${this.apiUrl}/usuarios/${userId}`, { nombre, correo, imagen })
            .pipe(
                map((response: any) => {
                    if (response.user) {
                        this.storage.set('userName', response.user.nombre);
                        this.storage.set('userEmail', response.user.correo);
                        this.storage.set('userImage', response.user.imagen || '');
                    }
                    return response;
                }),
                catchError((error) => {
                    console.error('Error al actualizar perfil:', error);
                    return throwError(() => new Error(error.error?.message || 'Error al actualizar perfil'));
                })
            );
    }
}