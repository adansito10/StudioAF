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

  formulario: any = {}; // Objeto dinámico para el formulario
  precioTotal: number = 0;
  tipoServicio: string = ''; // Para almacenar el tipo de servicio

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.servicio = {
        nombre: params['nombre'],
        descripcion: params['descripcion'],
        imagen: params['imagen'],
        video: params['video'],
        precio: +params['precio'] || 0,
        contenido: params['contenido'] ? params['contenido'].split(',') : []
      };

      this.tipoServicio = this.servicio.nombre;
      this.precioTotal = this.servicio.precio;

      // Inicializar el formulario según el tipo de servicio
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
          drone: false, // Específico para bodas
          albumPremium: false, // Específico para bodas
          fecha: '',
          hora: ''
        };
        break;
      case 'Paquete de XV Años':
        this.formulario = {
          horasExtras: 0,
          maquillaje: false, // Específico para XV Años
          videoCoreografia: false, // Específico para XV Años
          fecha: '',
          hora: ''
        };
        break;
      case 'Paquete BabyShower':
        this.formulario = {
          horasExtras: 0,
          decoracionExtra: false, // Específico para BabyShower
          videoRecuerdo: false, // Específico para BabyShower
          fecha: '',
          hora: ''
        };
        break;
      case 'Paquete Familiar':
        this.formulario = {
          horasExtras: 0,
          locacionExtra: false, // Específico para Familiar
          marcoFotos: false, // Específico para Familiar
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

    // Costo común para horas extras
    if (this.formulario.horasExtras > 0) {
      costoExtra += this.formulario.horasExtras * 300; // $300 por hora extra
    }

    // Costos adicionales específicos por tipo de servicio
    switch (this.tipoServicio) {
      case 'Paquete de Bodas':
        if (this.formulario.camarografoExtra) costoExtra += 800; // Camarógrafo extra
        if (this.formulario.drone) costoExtra += 1200; // Drone
        if (this.formulario.albumPremium) costoExtra += 600; // Álbum premium
        break;
      case 'Paquete de XV Años':
        if (this.formulario.maquillaje) costoExtra += 500; // Maquillaje
        if (this.formulario.videoCoreografia) costoExtra += 1000; // Video de coreografía
        break;
      case 'Paquete BabyShower':
        if (this.formulario.decoracionExtra) costoExtra += 400; // Decoración extra
        if (this.formulario.videoRecuerdo) costoExtra += 700; // Video recuerdo
        break;
      case 'Paquete Familiar':
        if (this.formulario.locacionExtra) costoExtra += 300; // Locación extra
        if (this.formulario.marcoFotos) costoExtra += 200; // Marco de fotos
        break;
    }

    this.precioTotal = this.servicio.precio + costoExtra;
  }

  enviarFormulario() {
    this.router.navigate(['/resumen-servicio'], {
      queryParams: {
        nombre: this.servicio.nombre,
        descripcion: this.servicio.descripcion,
        imagen: this.servicio.imagen,
        video: this.servicio.video,
        contenido: this.servicio.contenido.join(','),
        precio: this.servicio.precio,
        precioTotal: this.precioTotal,
        ...this.formulario // Pasar todos los campos del formulario como queryParams
      },
      queryParamsHandling: 'merge'
    });
  }
}