import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servicio-domicilio',
  templateUrl: './servicio-domicilio.page.html',
  styleUrls: ['./servicio-domicilio.page.scss'],
  standalone: false
})
export class ServicioDomicilioPage implements OnInit {
  formulario = {
    direccion: '',
    codigoPostal: '',
    estado: '',
    municipio: '',
    indicaciones: '',
    nombre: '',
    telefono: '',
  };

  ubicacionConfirmada = false;

  // Variables para los datos recibidos
  servicio: any = {
    nombre: '',
    descripcion: '',
    imagen: '',
    contenido: [],
    precio: 0
  };

  detallesExtras: any = {
    horasExtras: 0,
    camarografoExtra: false,
    setGrabacion: false,
    videoEvento: false,
    fecha: '',
    hora: ''
  };

  precioTotal: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Recuperar los datos pasados por queryParams
    this.route.queryParams.subscribe(params => {
      this.servicio = {
        nombre: params['nombre'] || '',
        descripcion: params['descripcion'] || '',
        imagen: params['imagen'] || '',
        contenido: params['contenido'] ? params['contenido'].split(',') : [],
        precio: +params['precio'] || 0
      };

      this.detallesExtras = {
        horasExtras: +params['horasExtras'] || 0,
        camarografoExtra: params['camarografoExtra'] === 'true',
        setGrabacion: params['setGrabacion'] === 'true',
        videoEvento: params['videoEvento'] === 'true',
        fecha: params['fecha'] || 'No especificada',
        hora: params['hora'] || 'No especificada'
      };

      this.precioTotal = +params['precio'] || this.servicio.precio;
    });

    // Recuperar el domicilio de localStorage (si existe)
    const domicilioGuardado = localStorage.getItem('domicilio');
    if (domicilioGuardado) {
      this.formulario = JSON.parse(domicilioGuardado);
    }
  }

  usarUbicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

          try {
            const response = await fetch(url);
            const data = await response.json();

            this.formulario.direccion = data.display_name || `Lat: ${lat}, Lng: ${lng}`;
            this.formulario.codigoPostal = data.address.postcode || '';
            this.formulario.estado = data.address.state || '';
            this.formulario.municipio = data.address.city || data.address.town || data.address.village || '';
            this.ubicacionConfirmada = true;

            // Guardar la dirección en localStorage
            this.guardarDomicilio(this.formulario);
          } catch (error) {
            console.error('Error obteniendo la dirección:', error);
            alert('No se pudo obtener la dirección.');
          }
        },
        (error) => {
          console.error('Error obteniendo la ubicación:', error);
          alert('No se pudo acceder a la ubicación. Activa el GPS.');
        }
      );
    } else {
      alert('Tu dispositivo no soporta geolocalización.');
    }
  }

  // Función para guardar el domicilio en localStorage
  guardarDomicilio(domicilio: any) {
    localStorage.setItem('domicilio', JSON.stringify(domicilio));
  }

  enviarFormulario() {
    // Guardar el domicilio en localStorage
    this.guardarDomicilio(this.formulario);

    // Navegar a MetodoPagoPage pasando los datos
    this.router.navigate(['/metodo-pago'], {
      queryParams: {
        nombre: this.servicio.nombre,
        precio: this.precioTotal,
        descripcion: this.servicio.descripcion,
        imagen: this.servicio.imagen,
        contenido: this.servicio.contenido.join(','),
        horasExtras: this.detallesExtras.horasExtras,
        camarografoExtra: this.detallesExtras.camarografoExtra,
        setGrabacion: this.detallesExtras.setGrabacion,
        videoEvento: this.detallesExtras.videoEvento,
        fecha: this.detallesExtras.fecha,
        hora: this.detallesExtras.hora
      }
    });
  }
}