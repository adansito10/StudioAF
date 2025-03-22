import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Servicio {
  id: number;
  nombre_servicio: string;
  descripcion: string;
  imagen: string; // URL remota
  video?: string; // URL remota
  created_at?: string;
  update_at?: string;
  delete_at?: string;
  localImagen?: string; // Ruta local después de descargar
}

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private apiUrl = 'http://192.168.1.70:3000/api/servicios'; // Cambia por tu IP y puerto

  constructor(private http: HttpClient) { }

  getServicios(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createServicio(servicio: Partial<Servicio>): Observable<any> {
    return this.http.post<any>(this.apiUrl, servicio);
  }
}