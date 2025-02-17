import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicio-domicilio',
  templateUrl: './servicio-domicilio.page.html',
  styleUrls: ['./servicio-domicilio.page.scss'],
  standalone:false
})
export class ServicioDomicilioPage implements OnInit {
  formulario = {
    direccion: '',
    sinNumero: false,
    codigoPostal: '',
    estado: '',
    municipio: '',
    indicaciones: '',
    nombre: '',
    telefono: '',
  };

  constructor() {}
  ngOnInit(): void {
  }

  enviarFormulario() {
    console.log('Datos enviados:', this.formulario);
    alert('Formulario enviado con éxito');
  }
}