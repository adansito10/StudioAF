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
    precio: 0
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
