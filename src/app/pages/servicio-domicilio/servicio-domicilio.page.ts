import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}

  // 🛰️ Obtener ubicación automáticamente
  usarUbicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Convertir coordenadas a dirección con OpenStreetMap (API gratuita)
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

          try {
            const response = await fetch(url);
            const data = await response.json();

            this.formulario.direccion = data.display_name || `Lat: ${lat}, Lng: ${lng}`;
            this.formulario.codigoPostal = data.address.postcode || '';
            this.formulario.estado = data.address.state || '';
            this.formulario.municipio = data.address.city || data.address.town || data.address.village || '';
            this.ubicacionConfirmada = true;
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

  enviarFormulario() {
    console.log('Datos enviados:', this.formulario);
    alert('Formulario enviado con éxito');
  }
}
