import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-servicio',
  templateUrl: './detalle-servicio.page.html',
  styleUrls: ['./detalle-servicio.page.scss'],
  standalone: false
})
export class DetalleServicioPage implements OnInit {
  servicio: any = {
    nombre: '',
    descripcion: '',
    imagen: '',
    precio: 0,
    contenido: [],
    video: ''
  };

  incluirVideo: boolean = false;
  precioTotal: number = 0;
  costoVideo: number = 500; // Precio adicional por el video

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.servicio.nombre = params['nombre'];
      this.servicio.descripcion = params['descripcion'];
      this.servicio.imagen = params['imagen'];
      this.servicio.video = params['video'] || '';  

      switch (this.servicio.nombre) {
        case 'Paquete de Bodas':
          this.servicio.precio = 2500;
          this.servicio.contenido = [
            'Sesión fotográfica profesional',
            '50 fotos de alta calidad',
            '1 hora de sesión'
          ];
          this.servicio.video = 'https://fb.watch/xOdxl6Debf/';  
          break;
          
        case 'Paquete de XV Años':
          this.servicio.precio = 2000;
          this.servicio.contenido = [
            'Sesión con cambio de vestuario',
            '40 fotos editadas',
            '1 video resumen'
          ];
          this.servicio.video = 'assets/videos/paquete-xv.mp4';
          break;

        case 'Paquete Infantil':
          this.servicio.precio = 1800;
          this.servicio.contenido = [
            'Fotografías temáticas',
            '30 fotos de alta calidad',
            'Mini álbum impreso'
          ];
          this.servicio.video = 'assets/videos/paquete-infantil.mp4';
          break;

        default:
          this.servicio.precio = 0;
          this.servicio.contenido = ['Información no disponible'];
          this.servicio.video = '';
      }

      // Inicializar precio
      this.precioTotal = this.servicio.precio;
    });
  }

  actualizarPrecio() {
    this.precioTotal = this.servicio.precio + (this.incluirVideo ? this.costoVideo : 0);
  }
}
