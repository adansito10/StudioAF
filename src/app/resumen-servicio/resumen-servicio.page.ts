import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resumen-servicio',
  templateUrl: './resumen-servicio.page.html',
  styleUrls: ['./resumen-servicio.page.scss'],
  standalone: false
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

  detallesExtras: any = {};

  precioTotal: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.servicio = {
        nombre: params['nombre'] || '',
        descripcion: params['descripcion'] || '',
        imagen: params['imagen'] || '',
        video: params['video'] || '',
        contenido: params['contenido'] ? params['contenido'].split(',') : [],
        precio: +params['precio'] || 0
      };

      this.detallesExtras = {
        horasExtras: +params['horasExtras'] || 0,
        fecha: params['fecha'] || 'No especificada',
        hora: params['hora'] || 'No especificada'
      };

      switch (this.servicio.nombre) {
        case 'Paquete de Bodas':
          this.detallesExtras.camarografoExtra = params['camarografoExtra'] === 'true';
          this.detallesExtras.drone = params['drone'] === 'true';
          this.detallesExtras.albumPremium = params['albumPremium'] === 'true';
          break;
        case 'Paquete de XV Años':
          this.detallesExtras.maquillaje = params['maquillaje'] === 'true';
          this.detallesExtras.videoCoreografia = params['videoCoreografia'] === 'true';
          break;
        case 'Paquete BabyShower':
          this.detallesExtras.decoracionExtra = params['decoracionExtra'] === 'true';
          this.detallesExtras.videoRecuerdo = params['videoRecuerdo'] === 'true';
          break;
        case 'Paquete Familiar':
          this.detallesExtras.locacionExtra = params['locacionExtra'] === 'true';
          this.detallesExtras.marcoFotos = params['marcoFotos'] === 'true';
          break;

          case 'Paquete Bautizo':
            this.detallesExtras.videoretrato = params['videoretrato'] === 'true';
            this.detallesExtras.marcoFotos = params['marcoFotos'] === 'true';
            this.detallesExtras.albumedefotos = params['albumedefotos'] === 'true';
            break;
      }

      this.precioTotal = +params['precioTotal'] || this.servicio.precio; // Mostrar el precio actualizado
    });
  }
}