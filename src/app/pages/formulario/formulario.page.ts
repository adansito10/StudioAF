import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
  standalone: false
})
export class FormularioPage implements OnInit {
  domicilio: any = null;

  // Variables para los datos pasados a través de queryParams
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Recuperar los datos pasados por queryParams
    this.route.queryParams.subscribe(params => {
      if (params['nombre']) {
        this.servicio.nombre = params['nombre'];
        this.precioTotal = params['precio'];
        console.log('Servicio recibido:', this.servicio);
        console.log('Precio total:', this.precioTotal);
      }

      // Recibir los datos adicionales
      this.servicio = {
        nombre: params['nombre'],
        descripcion: params['descripcion'],
        imagen: params['imagen'],
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

      this.precioTotal = +params['precioTotal'] || this.servicio.precio;  // Actualizar precio total
    });

    // Recuperar el domicilio de localStorage
    const domicilioGuardado = localStorage.getItem('domicilio');
    if (domicilioGuardado) {
      this.domicilio = JSON.parse(domicilioGuardado);
      console.log('Domicilio recuperado:', this.domicilio);
    }
  }

  editarDomicilio() {
    // Aquí puedes implementar la lógica para editar el domicilio
    // Por ejemplo, navegar a una página de edición
    console.log('Navegando a editar domicilio...');
  }
}
