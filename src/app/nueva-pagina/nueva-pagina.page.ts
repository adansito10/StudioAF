import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nueva-pagina',
  templateUrl: './nueva-pagina.page.html',
  styleUrls: ['./nueva-pagina.page.scss'],
  standalone: false
})
export class NuevaPaginaPage implements OnInit {
  servicio: any = {
    nombre: '',
    descripcion: '',
    imagen: '',
    contenido: [],
    video: '',
    precio: 0
  };

  formulario: any = {};
  precioTotal: number = 0;
  tipoServicio: string = '';
  fechaInvalida: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.servicio = {
        nombre: params['nombre'] || '',
        descripcion: params['descripcion'] || '',
        imagen: params['imagen'] || '',
        video: params['video'] || '',
        precio: +params['precio'] || 0,
        contenido: params['contenido'] ? params['contenido'].split(',') : []
      };

      this.tipoServicio = this.servicio.nombre;
      this.precioTotal = this.servicio.precio;

      this.inicializarFormulario();
      this.actualizarPrecio();
    });
  }

  inicializarFormulario() {
    switch (this.tipoServicio) {
      case 'Paquete de Bodas':
        this.formulario = {
          horasExtras: 0,
          camarografoExtra: false,
          drone: false,
          albumPremium: false,
          sesionPreBoda: false,
          iluminacionProfesional: false,
          albumDigital: false,
          coberturaRedes: false,
          fecha: '',
          hora: ''
        };
        break;
      case 'Paquete de XV Años':
        this.formulario = {
          horasExtras: 0,
          maquillaje: false,
          videoCoreografia: false,
          coreografiaProfesional: false,
          cabinaFotos360: false,
          pastelTematico: false,
          invitacionesDigitales: false,
          fecha: '',
          hora: ''
        };
        break;
      case 'Paquete BabyShower':
        this.formulario = {
          horasExtras: 0,
          decoracionExtra: false,
          videoRecuerdo: false,
          mesaDulces: false,
          juegosInteractivos: false,
          sesionFotosPadres: false,
          recuerdosPersonalizados: false,
          fecha: '',
          hora: ''
        };
        break;
      case 'Paquete Familiar':
        this.formulario = {
          horasExtras: 0,
          locacionExtra: false,
          marcoFotos: false,
          sesionExteriores: false,
          impresionLienzo: false,
          vestuarioTematico: false,
          videoFamiliar: false,
          fecha: '',
          hora: ''
        };
        break;
      case 'Paquete Bautizo':
        this.formulario = {
          horasExtras: 0,
          videoretrato: false,
          marcoFotos: false,
          albumedefotos: false,
          invitacionesFisicas: false,
          sesionIglesia: false,
          libroFirmas: false,
          decoracionTematica: false,
          fecha: '',
          hora: ''
        };
        break;
      default:
        this.formulario = {
          horasExtras: 0,
          fecha: '',
          hora: ''
        };
    }
  }

  actualizarPrecio() {
    let costoExtra = 0;

    if (this.formulario.horasExtras > 0) {
      costoExtra += this.formulario.horasExtras * 300;
    }

    switch (this.tipoServicio) {
      case 'Paquete de Bodas':
        if (this.formulario.camarografoExtra) costoExtra += 1500;
        if (this.formulario.drone) costoExtra += 1200;
        if (this.formulario.albumPremium) costoExtra += 900;
        if (this.formulario.sesionPreBoda) costoExtra += 1000;
        if (this.formulario.iluminacionProfesional) costoExtra += 800;
        if (this.formulario.albumDigital) costoExtra += 600;
        if (this.formulario.coberturaRedes) costoExtra += 500;
        break;
      case 'Paquete de XV Años':
        if (this.formulario.maquillaje) costoExtra += 1000;
        if (this.formulario.videoCoreografia) costoExtra += 2500;
        if (this.formulario.coreografiaProfesional) costoExtra += 1200;
        if (this.formulario.cabinaFotos360) costoExtra += 1500;
        if (this.formulario.pastelTematico) costoExtra += 800;
        if (this.formulario.invitacionesDigitales) costoExtra += 400;
        break;
      case 'Paquete BabyShower':
        if (this.formulario.decoracionExtra) costoExtra += 400;
        if (this.formulario.videoRecuerdo) costoExtra += 700;
        if (this.formulario.mesaDulces) costoExtra += 600;
        if (this.formulario.juegosInteractivos) costoExtra += 300;
        if (this.formulario.sesionFotosPadres) costoExtra += 500;
        if (this.formulario.recuerdosPersonalizados) costoExtra += 400;
        break;
      case 'Paquete Familiar':
        if (this.formulario.locacionExtra) costoExtra += 300;
        if (this.formulario.marcoFotos) costoExtra += 200;
        if (this.formulario.sesionExteriores) costoExtra += 500;
        if (this.formulario.impresionLienzo) costoExtra += 400;
        if (this.formulario.vestuarioTematico) costoExtra += 300;
        if (this.formulario.videoFamiliar) costoExtra += 600;
        break;
      case 'Paquete Bautizo':
        if (this.formulario.videoretrato) costoExtra += 1500;
        if (this.formulario.marcoFotos) costoExtra += 800;
        if (this.formulario.albumedefotos) costoExtra += 1500;
        if (this.formulario.invitacionesFisicas) costoExtra += 500;
        if (this.formulario.sesionIglesia) costoExtra += 700;
        if (this.formulario.libroFirmas) costoExtra += 300;
        if (this.formulario.decoracionTematica) costoExtra += 600;
        break;

        case 'Paquete de sesiones':
          if (this.formulario.edicionAvanzada) costoExtra += 500;
          if (this.formulario.locacionAdicional) costoExtra += 400;
          if (this.formulario.impresionFotos) costoExtra += 300;
          if (this.formulario.videoCorto) costoExtra += 600;
          if (this.formulario.cambioVestuario) costoExtra += 200;
          if (this.formulario.sesionEstudio) costoExtra += 500;
          break;
      }

    this.precioTotal = this.servicio.precio + costoExtra;
  }

  validarFecha() {
    if (this.formulario.fecha) {
      const fechaSeleccionada = new Date(this.formulario.fecha);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      this.fechaInvalida = fechaSeleccionada < hoy;
    } else {
      this.fechaInvalida = false;
    }
  }

  enviarFormulario() {
    this.validarFecha();
    if (this.fechaInvalida || !this.formulario.fecha || !this.formulario.hora) {
      return;
    }

    this.router.navigate(['/resumen-servicio'], {
      queryParams: {
        nombre: this.servicio.nombre,
        descripcion: this.servicio.descripcion,
        imagen: this.servicio.imagen,
        video: this.servicio.video,
        contenido: this.servicio.contenido.join(','),
        precio: this.servicio.precio,
        precioTotal: this.precioTotal,
        ...this.formulario
      },
      queryParamsHandling: 'merge'
    });
  }

  mostrarMensajeSiDesactivado() {
    if (this.fechaInvalida || !this.formulario.fecha || !this.formulario.hora) {
      let mensaje = 'Por favor selecciona la fecha del evento';
      if (!this.formulario.hora) {
        mensaje = 'Por favor selecciona la hora del evento';
      }
      if (this.fechaInvalida) {
        mensaje = 'La fecha no puede ser anterior a hoy';
      }
      alert(mensaje);
    }
  }
}