import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'],
  standalone: false
})
export class ConsultasPage implements OnInit {
  pedidos = [
    { id: 1, nombre: 'Paquete de bodas', precio: 1500, fechaCompra: '2025-02-25', estado: 'pendiente' },
  
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  irATab1() {
    this.router.navigate(['/tabs/tab1']);
  }

  getEstadoColor(estado: string) {
    switch (estado) {
      case 'pendiente': return 'warning';
      case 'completado': return 'success';
      case 'cancelado': return 'danger';
      default: return 'medium';
    }
  }

  cancelarPedido(pedido: any) {
    pedido.estado = 'cancelado';
    console.log(`Pedido ${pedido.id} cancelado`);
  }
}
