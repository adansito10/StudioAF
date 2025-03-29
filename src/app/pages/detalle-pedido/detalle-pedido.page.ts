import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.page.html',
  styleUrls: ['./detalle-pedido.page.scss'],
})
export class DetallePedidoPage implements OnInit {
  transaccion: any = {};
  
    constructor(private route: ActivatedRoute) {}
  
    ngOnInit() {
      // Obtener los datos de la transacción desde queryParams
      this.route.queryParams.subscribe(params => {
        this.transaccion = {
          id: params['id'] || '',
          fecha: params['fecha'] || '',
          metodoPago: params['metodoPago'] || '',
          paquete: params['paquete'] || '',
          monto: params['monto'] || 0,
          moneda: params['moneda'] || '',
          estado: params['estado'] || '',
        };
        console.log('Transacción recibida en HistorialPagosPage:', this.transaccion);
      });
    }
  }