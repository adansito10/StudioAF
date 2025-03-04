import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resumen-servicio',
  templateUrl: './resumen-servicio.page.html',
  styleUrls: ['./resumen-servicio.page.scss'],
  standalone:false
})
export class ResumenServicioPage implements OnInit {
  servicio: any = {
    nombre: '',
    descripcion: '',
    imagen: '',
    contenido: [],
    video: '',
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.servicio = {
        nombre: params['nombre'],
        descripcion: params['descripcion'],
        imagen: params['imagen'],
        video: params['video'],
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
  
      this.precioTotal = +params['precioTotal'] || this.servicio.precio; // Mostrar el precio actualizado
    });
  }
  
}
