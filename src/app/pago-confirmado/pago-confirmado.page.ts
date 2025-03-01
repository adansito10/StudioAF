import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pago-confirmado',
  templateUrl: './pago-confirmado.page.html',
  styleUrls: ['./pago-confirmado.page.scss'],
  standalone:false
})
export class PagoConfirmadoPage implements OnInit {
  paqueteSeleccionado: any;

  constructor(private router: Router) {
    // Puedes pasar los datos del paquete desde la página anterior usando el router
    const navigation = this.router.getCurrentNavigation();
    this.paqueteSeleccionado = navigation?.extras?.state?.['paquete'];
  }

  ngOnInit() {}
}
