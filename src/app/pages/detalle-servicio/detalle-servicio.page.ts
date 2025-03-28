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
    hora: '',
    // Nuevos extras para Paquete de Sesiones
    edicionAvanzada: false,
    locacionAdicional: false,
    impresionFotos: false,
    videoCorto: false,
    cambioVestuario: false,
    sesionEstudio: false
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
        // Nuevos extras para Paquete de Sesiones
        edicionAvanzada: params['edicionAvanzada'] === 'true',
        locacionAdicional: params['locacionAdicional'] === 'true',
        impresionFotos: params['impresionFotos'] === 'true',
        videoCorto: params['videoCorto'] === 'true',
        cambioVestuario: params['cambioVestuario'] === 'true',
        sesionEstudio: params['sesionEstudio'] === 'true'
      };

      // Asignar los precios y contenido según el tipo de servicio
      switch (this.servicio.nombre) {
        case 'Paquete de Bodas':
          this.servicio.precio = 10000;
          this.servicio.contenido = [
            'Cobertura completa del evento',
            'Entrega digital en alta calidad',
            'Fotografía natural y artística',
            'Edición profesional'
          ];
          this.servicio.video = 'https://fb.watch/xOdxl6Debf/';
          break;
        case 'Paquete de XV Años':
          this.servicio.precio = 15000;
          this.servicio.contenido = [
            'Cobertura completa del evento',
            'Sesión formal con la quinceañera',
            'Fotografía de familia y amigos'
          ];
          this.servicio.video = 'assets/videos/paquete-xv.mp4';
          break;
        case 'Paquete BabyShower':
          this.servicio.precio = 5000;
          this.servicio.contenido = [
            'Cobertura completa',
            'Entrega digital en alta calidad',
            'Fotografías familiares y amigos',
            'Edición profesional'
          ];
          this.servicio.video = 'assets/videos/paquete-infantil.mp4';
          break;
        case 'Paquete Familiar':
          this.servicio.precio = 6000;
          this.servicio.contenido = [
            'Sesión fotográfica en locación elegida',
            'Entrega en digital en alta calidad',
            'Fotografías en grupal o individuales'
          ];
          this.servicio.video = 'assets/videos/paquete-infantil.mp4';
          break;
        case 'Paquete Bautizo':
          this.servicio.precio = 6000;
          this.servicio.contenido = [
            'Cobertura completa del evento',
            'Fotografías familiares y padrinos',
            '100 fotografías de alta calidad'
          ];
          this.servicio.video = 'assets/videos/paquete-infantil.mp4';
          break;
        case 'Paquete de sesiones':
          this.servicio.precio = 6000;
          this.servicio.contenido = [
            'Sesión fotográfica en locación a elegir (estudio o exteriores)',
            'Entrega de 50 fotos en alta resolución',
            'Duración de la sesión: 2 horas'
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

    // Costos comunes
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

    // Costos específicos del Paquete de Sesiones
    if (this.servicio.nombre === 'Paquete de Sesiones') {
      if (this.detallesExtras.edicionAvanzada) {
        extraCosto += 500; // Edición avanzada de fotos
      }
      if (this.detallesExtras.locacionAdicional) {
        extraCosto += 400; // Locación adicional
      }
      if (this.detallesExtras.impresionFotos) {
        extraCosto += 300; // Impresión de 10 fotos en formato físico
      }
      if (this.detallesExtras.videoCorto) {
        extraCosto += 600; // Video corto de la sesión
      }
      if (this.detallesExtras.cambioVestuario) {
        extraCosto += 200; // Cambio de vestuario durante la sesión
      }
      if (this.detallesExtras.sesionEstudio) {
        extraCosto += 500; // Sesión adicional en estudio
      }
    }

    // Actualizar precio total incluyendo las opciones adicionales
    this.precioTotal = this.servicio.precio + extraCosto;
  }
}