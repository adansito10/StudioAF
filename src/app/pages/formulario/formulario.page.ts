import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
  standalone: false
})
export class FormularioPage implements OnInit {
  domicilio: any = null;

  constructor() {}

  ngOnInit(): void {
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
