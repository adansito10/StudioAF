import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { toDataURL } from 'qrcode';
import { Router, ActivatedRoute } from '@angular/router';

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

  // Cambio el nombre a "route" para reflejar correctamente el ActivatedRoute inyectado
  constructor(private router: Router, private route: ActivatedRoute) {}

  paqueteSeleccionado: any = {
    nombre: '',
    precio: 0
  };
  ventaId: string = '123456';  // Un ID de venta generado de manera única.

  ngOnInit() {
    // Usando "this.route" correctamente para obtener los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      // Recuperar los datos del servicio
      this.paqueteSeleccionado.nombre = params['nombre'];
      this.paqueteSeleccionado.precio = params['precio'];
    });
  }

  selectPaymentMethod(method: string) {
    this.selectedMethod = method;
    this.selectedMethodName = this.getPaymentMethodName(method);
  }

  getPaymentMethodName(method: string): string {
    switch (method) {
      case 'tarjetaGuardada': return 'Tarjeta Guardada';
      case 'tarjetaCredito': return 'Tarjeta de Crédito';
      case 'tarjetaDebito': return 'Tarjeta de Débito';
      case 'spei': return 'Transferencia SPEI';
      case 'efectivo': return 'Pago en Efectivo';
      case 'oxxo': return 'Pago en OXXO';
      default: return '';
    }
  }

  submitPayment() {
    console.log('Pago confirmado:', this.formData);
    alert(`Pago realizado con éxito. Total: $${this.paqueteSeleccionado.precio}`);

    // Si el método de pago es tarjeta, generar el PDF y descargar automáticamente
    if (this.selectedMethod === 'tarjetaGuardada' || this.selectedMethod === 'tarjetaCredito' || this.selectedMethod === 'tarjetaDebito') {
      this.generatePaymentReceipt();
    } else if (this.selectedMethod === 'oxxo') {
      this.generatePdfWithQRCode();
    } else {
      this.generateSimpleReceipt();
    }

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
      this.saveAs(doc.output('blob'), 'pago_oxxo.pdf');
    });
  }

  generatePaymentReceipt() {
    const doc = new jsPDF();

    // Agregar título
    doc.setFontSize(18);
    doc.text('Comprobante de Pago', 10, 10);
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleString()}`, 10, 20);

    // Detalles de la compra
    doc.text(`ID de Venta: ${this.ventaId}`, 10, 30);
    doc.text(`Paquete: ${this.paqueteSeleccionado.nombre}`, 10, 40);
    doc.text(`Total: $${this.paqueteSeleccionado.precio}`, 10, 50);
    doc.text(`Método de Pago: ${this.selectedMethodName}`, 10, 60);

    // Guardar el PDF
    this.saveAs(doc.output('blob'), 'comprobante_pago.pdf');
  }

  generateSimpleReceipt() {
    const doc = new jsPDF();

    // Agregar título
    doc.setFontSize(18);
    doc.text('Comprobante de Pago', 10, 10);
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleString()}`, 10, 20);

    // Detalles de la compra
    doc.text(`ID de Venta: ${this.ventaId}`, 10, 30);
    doc.text(`Paquete: ${this.paqueteSeleccionado.nombre}`, 10, 40);
    doc.text(`Total: $${this.paqueteSeleccionado.precio}`, 10, 50);
    doc.text(`Método de Pago: ${this.selectedMethodName}`, 10, 60);

    // Guardar el PDF
    this.saveAs(doc.output('blob'), 'comprobante_pago.pdf'); // En lugar de saveAs
  }

  // Función para descargar el archivo
  saveAs(blob: Blob | MediaSource, fileName: string) {
    try {
      // Crear un enlace temporal para la descarga
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      // Configurar el enlace
      link.href = url;
      link.download = fileName;

      // Agregar el enlace al documento y simular un clic
      document.body.appendChild(link);
      link.click();

      // Eliminar el enlace del documento
      document.body.removeChild(link);

      // Revocar el objeto URL
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al guardar el archivo:', error);
    }
  }
}
