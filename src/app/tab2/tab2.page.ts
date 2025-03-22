import { Component, OnInit } from '@angular/core';
import { Servicio, ServiciosService } from 'src/services/servicios.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
  servicios: any[] = []; // Array para los servicios mapeados

  constructor(private serviciosService: ServiciosService) {}

  ngOnInit() {
    this.cargarServicios();
  }

  cargarServicios() {
    this.serviciosService.getServicios().subscribe({
      next: (response: any) => {
        // Mapeamos los datos de la API al formato que espera el HTML
        this.servicios = response.servicios.map((servicio: Servicio) => ({
          titulo: servicio.nombre_servicio,
          descripcion: servicio.descripcion,
          imagen: servicio.imagen,
          video: servicio.video
        }));
        console.log('Servicios cargados desde la API:', this.servicios);
      },
      error: (error) => {
        console.error('Error al cargar servicios:', error);
        // No asignamos datos locales, dejamos el array vacío en caso de error
      }
    });
  }
}