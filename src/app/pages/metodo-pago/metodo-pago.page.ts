import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { toDataURL } from 'qrcode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.page.html',
  styleUrls: ['./metodo-pago.page.scss'],
  standalone: false
})
export class MetodoPagoPage implements OnInit {
  selectedMethod: string | null = null;
  selectedMethodName: string = '';
  formData: any = {};

  constructor(private router: Router) {}


  paqueteSeleccionado: any = {
    nombre: 'Paquete de Bodas',
    precio: 2500
  };

  ventaId: string = '123456';  // Un ID de venta generado de manera única.

  ngOnInit() {}

  selectPaymentMethod(method: string) {
    this.selectedMethod = method;
    this.selectedMethodName = this.getPaymentMethodName(method);
  }

  getPaymentMethodName(method: string): string {
    switch (method) {
      case 'tarjetaGuardada': return 'Tarjeta Guardada';
      case 'tarjetaCredito': return 'Tarjeta de Crédito';
      case 'spei': return 'Transferencia SPEI';
      case 'efectivo': return 'Pago en Efectivo';
      case 'oxxo': return 'Pago en OXXO';
      default: return '';
    }
  }

  submitPayment() {
    console.log('Pago confirmado:', this.formData);
    alert(`Pago realizado con éxito. Total: $${this.paqueteSeleccionado.precio}`);

    this.router.navigate(['/consultas'], {
      state: { paquete: this.paqueteSeleccionado }
    });
  }

  generatePdfWithQRCode() {
    const doc = new jsPDF();

    // Datos del paquete y venta
    const ventaDetails = `ID de Venta: ${this.ventaId}\nPaquete: ${this.paqueteSeleccionado.nombre}\nPrecio: $${this.paqueteSeleccionado.precio}`;

    // Generar el código QR para el pago
    toDataURL(`Pago OXXO - ID de Venta: ${this.ventaId}`, { errorCorrectionLevel: 'H' }, (err, url) => {
      if (err) {
        console.error('Error al generar el código QR:', err);
        return;
      }

      // Añadir los datos al PDF
      doc.text(ventaDetails, 10, 10);
      doc.addImage(url, 'PNG', 10, 30, 50, 50);  // Agregar el código QR al PDF

      // Descargar el PDF
      doc.save('pago_oxxo.pdf');
    });
  }
}
