import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { toDataURL } from 'qrcode';
import { Router, ActivatedRoute } from '@angular/router';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.page.html',
  styleUrls: ['./metodo-pago.page.scss'],
  standalone: false
})
export class MetodoPagoPage implements OnInit {
  selectedMethod: string | null = null;
  selectedMethodName: string = '';
  formData: any = {
    nombreTarjeta: '',
    numeroTarjeta: '',
    expiracionMes: null,
    expiracionYear: null,
    cvv: '',
    saveCard: false
  };

  paymentMethods = [
    {
      id: 'tarjetaCredito',
      name: 'Tarjeta de Crédito',
      logo: 'assets/logos/credit-card.png'
    },
    {
      id: 'tarjetaDebito',
      name: 'Tarjeta de Débito',
      logo: 'assets/logos/debit-card.png'
    },
    {
      id: 'oxxo',
      name: 'Pago en OXXO',
      logo: 'data:image/png;base64,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'
    }
  ];
  

  // Listas para los selectores de mes y año
  months: string[] = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')); // 01-12
  years: string[] = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() + i).toString()); // 2024-2033

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private platform: Platform
  ) {}

  paqueteSeleccionado: any = {
    nombre: '',
    precio: 0
  };
  ventaId: string = '123456';

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
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
      case 'tarjetaCredito': return 'Tarjeta de Crédito';
      case 'tarjetaDebito': return 'Tarjeta de Débito';
      case 'oxxo': return 'Pago en OXXO';
      default: return '';
    }
  }

  async submitPayment() {
    console.log('Pago confirmado:', this.formData);
    alert(`Pago realizado con éxito. Total: $${this.paqueteSeleccionado.precio}`);

    if (this.selectedMethod === 'tarjetaCredito' || this.selectedMethod === 'tarjetaDebito') {
      await this.generatePaymentReceipt();
    } else if (this.selectedMethod === 'oxxo') {
      await this.generatePdfWithQRCode();
    }

    this.router.navigate(['/'], {
      state: { paquete: this.paqueteSeleccionado }
    });
  }

  async generatePdfWithQRCode() {
    const doc = new jsPDF();
    const ventaDetails = `ID de Venta: ${this.ventaId}\nPaquete: ${this.paqueteSeleccionado.nombre}\nPrecio: $${this.paqueteSeleccionado.precio}`;

    try {
      const qrUrl = await new Promise<string>((resolve, reject) => {
        toDataURL(`Pago OXXO - ID de Venta: ${this.ventaId}`, { errorCorrectionLevel: 'H' }, (err, url) => {
          if (err) reject(err);
          else resolve(url);
        });
      });

      doc.text(ventaDetails, 10, 10);
      doc.addImage(qrUrl, 'PNG', 10, 30, 50, 50);
      await this.saveFile(doc.output('blob'), 'pago_oxxo.pdf');
    } catch (error) {
      console.error('Error al generar el código QR:', error);
    }
  }

  async generatePaymentReceipt() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Comprobante de Pago', 10, 10);
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date().toLocaleString()}`, 10, 20);
    doc.text(`ID de Venta: ${this.ventaId}`, 10, 30);
    doc.text(`Paquete: ${this.paqueteSeleccionado.nombre}`, 10, 40);
    doc.text(`Total: $${this.paqueteSeleccionado.precio}`, 10, 50);
    doc.text(`Método de Pago: ${this.selectedMethodName}`, 10, 60);
    await this.saveFile(doc.output('blob'), 'comprobante_pago.pdf');
  }

  async saveFile(blob: Blob, fileName: string) {
    if (this.platform.is('capacitor') || this.platform.is('cordova')) {
      try {
        const arrayBuffer = await blob.arrayBuffer();
        const base64String = btoa(
          new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        const result = await Filesystem.writeFile({
          path: fileName,
          data: base64String,
          directory: Directory.Documents,
          recursive: true
        });

        alert(`Archivo guardado en: ${result.uri}`);
      } catch (error) {
        console.error('Error al guardar el archivo en el dispositivo:', error);
        alert('No se pudo guardar el archivo. Verifica los permisos.');
      }
    } else {
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }
}