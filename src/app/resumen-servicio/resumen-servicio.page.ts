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
          this.detallesExtras.sesionPreBoda = params['sesionPreBoda'] === 'true';
          this.detallesExtras.iluminacionProfesional = params['iluminacionProfesional'] === 'true';
          this.detallesExtras.albumDigital = params['albumDigital'] === 'true';
          this.detallesExtras.coberturaRedes = params['coberturaRedes'] === 'true';
          break;
        case 'Paquete de XV Años':
          this.detallesExtras.maquillaje = params['maquillaje'] === 'true';
          this.detallesExtras.videoCoreografia = params['videoCoreografia'] === 'true';
          this.detallesExtras.coreografiaProfesional = params['coreografiaProfesional'] === 'true';
          this.detallesExtras.cabinaFotos360 = params['cabinaFotos360'] === 'true';
          this.detallesExtras.pastelTematico = params['pastelTematico'] === 'true';
          this.detallesExtras.invitacionesDigitales = params['invitacionesDigitales'] === 'true';
          break;
        case 'Paquete BabyShower':
          this.detallesExtras.decoracionExtra = params['decoracionExtra'] === 'true';
          this.detallesExtras.videoRecuerdo = params['videoRecuerdo'] === 'true';
          this.detallesExtras.mesaDulces = params['mesaDulces'] === 'true';
          this.detallesExtras.juegosInteractivos = params['juegosInteractivos'] === 'true';
          this.detallesExtras.sesionFotosPadres = params['sesionFotosPadres'] === 'true';
          this.detallesExtras.recuerdosPersonalizados = params['recuerdosPersonalizados'] === 'true';
          break;
        case 'Paquete Familiar':
          this.detallesExtras.locacionExtra = params['locacionExtra'] === 'true';
          this.detallesExtras.marcoFotos = params['marcoFotos'] === 'true';
          this.detallesExtras.sesionExteriores = params['sesionExteriores'] === 'true';
          this.detallesExtras.impresionLienzo = params['impresionLienzo'] === 'true';
          this.detallesExtras.vestuarioTematico = params['vestuarioTematico'] === 'true';
          this.detallesExtras.videoFamiliar = params['videoFamiliar'] === 'true';
          break;
        case 'Paquete Bautizo':
          this.detallesExtras.videoretrato = params['videoretrato'] === 'true';
          this.detallesExtras.marcoFotos = params['marcoFotos'] === 'true';
          this.detallesExtras.albumedefotos = params['albumedefotos'] === 'true';
          this.detallesExtras.invitacionesFisicas = params['invitacionesFisicas'] === 'true';
          this.detallesExtras.sesionIglesia = params['sesionIglesia'] === 'true';
          this.detallesExtras.libroFirmas = params['libroFirmas'] === 'true';
          this.detallesExtras.decoracionTematica = params['decoracionTematica'] === 'true';
          break;
        case 'Paquete de sesiones':
          this.detallesExtras.edicionAvanzada = params['edicionAvanzada'] === 'true';
          this.detallesExtras.locacionAdicional = params['locacionAdicional'] === 'true';
          this.detallesExtras.impresionFotos = params['impresionFotos'] === 'true';
          this.detallesExtras.videoCorto = params['videoCorto'] === 'true';
          this.detallesExtras.cambioVestuario = params['cambioVestuario'] === 'true';
          this.detallesExtras.sesionEstudio = params['sesionEstudio'] === 'true';
          break;
      }

      this.precioTotal = +params['precioTotal'] || this.servicio.precio;
    });
  }
}