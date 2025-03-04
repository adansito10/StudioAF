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

  formulario = {
    horasExtras: 0,
    camarografoExtra: false,
    setGrabacion: false,
    videoEvento: false,
    fecha: '',
    hora: ''
  };

  precioTotal: number = 0;

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

      this.precioTotal = this.servicio.precio; // Inicializamos el precio total con el precio base
    });
  }

  actualizarPrecio() {
    let extraCosto = 0;

    if (this.formulario.horasExtras > 0) {
      extraCosto += this.formulario.horasExtras * 300; // Sumar costo de horas extras
    }
    if (this.formulario.camarografoExtra) {
      extraCosto += 800; // Sumar costo del camarógrafo extra
    }
    if (this.formulario.setGrabacion) {
      extraCosto += 500; // Sumar costo del set de grabación
    }
    if (this.formulario.videoEvento) {
      extraCosto += 1000; // Sumar costo del video del evento
    }

    this.precioTotal = this.servicio.precio + extraCosto; // Actualizar precio total
  }

  enviarFormulario() {
    this.router.navigate(['/resumen-servicio'], {
      queryParams: {
        nombre: this.servicio.nombre,
        descripcion: this.servicio.descripcion,
        imagen: this.servicio.imagen,
        video: this.servicio.video,
        contenido: this.servicio.contenido.join(','), // Convertir array a string para pasarlo por URL
        precio: this.servicio.precio,
        precioTotal: this.precioTotal, // Enviar precio total actualizado
        horasExtras: this.formulario.horasExtras,
        camarografoExtra: this.formulario.camarografoExtra,
        setGrabacion: this.formulario.setGrabacion,
        videoEvento: this.formulario.videoEvento,
        fecha: this.formulario.fecha,
        hora: this.formulario.hora
      },
      queryParamsHandling: 'merge'
    });
  }
}
