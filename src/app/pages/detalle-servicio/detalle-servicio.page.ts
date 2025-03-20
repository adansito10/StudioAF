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

  // Datos recibidos del formulario
  detallesExtras: any = {
    horasExtras: 0,
    camarografoExtra: false,
    setGrabacion: false,
    videoEvento: false,
    fecha: '',
    hora: ''
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // Cargar los datos del servicio
      this.servicio.nombre = params['nombre'];
      this.servicio.descripcion = params['descripcion'];
      this.servicio.imagen = params['imagen'];
      this.servicio.video = params['video'] || '';
      
      // Cargar los detalles extras del formulario
      this.detallesExtras = {
        horasExtras: params['horasExtras'] || 0,
        camarografoExtra: params['camarografoExtra'] === 'true',
        setGrabacion: params['setGrabacion'] === 'true',
        videoEvento: params['videoEvento'] === 'true',
        fecha: params['fecha'] || 'No especificada',
        hora: params['hora'] || 'No especificada',
      };

      // Asignar los precios y contenido según el tipo de servicio
      switch (this.servicio.nombre) {
        case 'Paquete de Bodas':
          this.servicio.precio = 10000;
          this.servicio.contenido = [
            'Cobertura completa del evento',
            'Entrega digital en alta calidad',
            'Fotografia natural y artistica',
            'Edicion profesional',
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
        case 'Paquete BabyShower':
          this.servicio.precio = 1800;
          this.servicio.contenido = [
            'Fotografías temáticas',
            '30 fotos de alta calidad',
            'Mini álbum impreso'
          ];
          this.servicio.video = 'assets/videos/paquete-infantil.mp4';
          break;


          case 'Paquete Familiar':
            this.servicio.precio = 1500;
            this.servicio.contenido = [
              '30 fotos de alta calidad',
              'Foto retrato'
            ];
            this.servicio.video = 'assets/videos/paquete-infantil.mp4';
            break;
        default:
          this.servicio.precio = 0;
          this.servicio.contenido = ['Información no disponible'];
          this.servicio.video = '';
      }

      // Actualizar el precio total con las opciones seleccionadas
      this.precioTotal = this.servicio.precio;
      this.actualizarPrecio();
    });
  }

  actualizarPrecio() {
    let extraCosto = 0;

    if (this.detallesExtras.horasExtras > 0) {
      extraCosto += this.detallesExtras.horasExtras * 300; // 300 por hora extra
    }
    if (this.detallesExtras.camarografoExtra) {
      extraCosto += 800; // Costo del camarógrafo extra
    }
    if (this.detallesExtras.setGrabacion) {
      extraCosto += 500; // Costo del set de grabación
    }
    if (this.detallesExtras.videoEvento) {
      extraCosto += 1000; // Costo del video del evento
    }

    // Actualizar precio total incluyendo las opciones adicionales
    this.precioTotal = this.servicio.precio + extraCosto;
  }
}
