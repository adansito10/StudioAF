import { Component, OnInit, AfterViewInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { toDataURL } from 'qrcode';
import { Router, ActivatedRoute } from '@angular/router';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';

declare var paypal: any;

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.page.html',
  styleUrls: ['./metodo-pago.page.scss'],
  standalone: false
})
export class MetodoPagoPage implements OnInit, AfterViewInit {
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

  private clientId = 'ATIofl8OUzubLTHl2IN2maj2n2CQz23k2Htk6VKejP6wf9Sa8Myg3bskj_ejS0slc5cWNvAgX_L4X_dt';
  private paypalScriptLoaded = false;
  public isWeb: boolean;

  paqueteSeleccionado: any = {
    nombre: '',
    precio: 0
  };
  ventaId: string = '123456';

  months: string[] = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  years: string[] = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() + i).toString());

  // Estados para el spinner y el mensaje de éxito
  isLoading: boolean = false;
  isSuccess: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private platform: Platform
  ) {
    this.isWeb = !this.platform.is('capacitor');
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.paqueteSeleccionado.nombre = params['nombre'] || '';
      this.paqueteSeleccionado.precio = parseFloat(params['precio']) || 0;
      console.log('Datos recibidos en MetodoPagoPage:', this.paqueteSeleccionado);
    });
  }

  ngAfterViewInit() {
    if (this.isWeb) {
      this.loadPayPalScript();
    }
  }

  selectPaymentMethod(method: string) {
    this.selectedMethod = method;
    this.selectedMethodName = this.getPaymentMethodName(method);

    if (method === 'tarjetaDebito' && this.isWeb) {
      if (this.paypalScriptLoaded && paypal) {
        this.renderPayPalButton();
      } else {
        console.log('Esperando a que el SDK de PayPal se cargue...');
      }
    }
  }

  getPaymentMethodName(method: string): string {
    switch (method) {
      case 'tarjetaCredito': return 'Tarjeta de Crédito';
      case 'tarjetaDebito': return 'PayPal';
      case 'oxxo': return 'Pago en OXXO';
      default: return '';
    }
  }

  async submitPayment() {
    if (!this.paqueteSeleccionado.precio || this.paqueteSeleccionado.precio <= 0) {
      alert('Error: El precio total no es válido. Por favor, regresa y selecciona un servicio.');
      this.router.navigate(['/formulario']);
      return;
    }

    // Mostrar el spinner
    this.isLoading = true;

    console.log('Método seleccionado:', this.selectedMethod);
    if (this.selectedMethod === 'tarjetaCredito') {
      console.log('Pago con tarjeta de crédito:', this.formData);
      // Simular un retraso para el procesamiento del pago
      setTimeout(async () => {
        await this.generatePaymentReceipt();
        this.isLoading = false;
        this.isSuccess = true;
      }, 2000); // 2 segundos de retraso para simular el procesamiento
    } else if (this.selectedMethod === 'oxxo') {
      // Simular un retraso para la generación del PDF
      setTimeout(async () => {
        await this.generatePdfWithQRCode();
        this.isLoading = false;
        this.isSuccess = true;
      }, 2000); // 2 segundos de retraso para simular la generación del PDF
    }
  }

  private loadPayPalScript() {
    if (this.paypalScriptLoaded) return;

    const scriptUrl = `https://www.paypal.com/sdk/js?client-id=${this.clientId}&currency=USD`;

    console.log('Intentando cargar PayPal SDK con URL:', scriptUrl);

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    script.onload = () => {
      this.paypalScriptLoaded = true;
      console.log('SDK de PayPal cargado correctamente');
      if (this.selectedMethod === 'tarjetaDebito') {
        this.renderPayPalButton();
      }
    };
    script.onerror = (error) => {
      console.error('Error al cargar el SDK de PayPal:', error);
      console.error('URL intentada:', script.src);
      alert('No se pudo cargar PayPal. Verifica tu conexión o el Client ID.');
    };
    document.body.appendChild(script);
  }

  private renderPayPalButton() {
    if (this.paypalScriptLoaded && paypal && document.getElementById('paypal-button-container')) {
      try {
        paypal.Buttons({
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: this.paqueteSeleccionado.precio.toFixed(2),
                    currency_code: 'USD',
                  },
                  description: `Compra de ${this.paqueteSeleccionado.nombre}`,
                },
              ],
            });
          },
          onApprove: (data: any, actions: any) => {
            return actions.order.capture().then((details: any) => {
              console.log('Pago completado:', details);
              alert(`¡Pago exitoso con PayPal! ID de transacción: ${details.id}`);
              this.isLoading = true; // Mostrar el spinner mientras se genera el comprobante
              setTimeout(async () => {
                await this.generatePaymentReceipt();
                this.isLoading = false;
                this.isSuccess = true;
              }, 2000); // 2 segundos de retraso para simular el procesamiento
            });
          },
          onError: (err: any) => {
            console.error('Error en el pago con PayPal:', err);
            alert('Error al procesar el pago con PayPal. Intenta de nuevo.');
          },
        }).render('#paypal-button-container');
      } catch (error) {
        console.error('Error al renderizar el botón de PayPal:', error);
        alert('Error al mostrar el botón de PayPal.');
      }
    } else {
      console.error('No se puede renderizar el botón de PayPal. Script cargado:', this.paypalScriptLoaded);
    }
  }

  async generatePdfWithQRCode() {
    const doc = new jsPDF();
    const ventaDetails = `ID de Venta: ${this.ventaId}\nPaquete: ${this.paqueteSeleccionado.nombre}\nPrecio: $${this.paqueteSeleccionado.precio}`;
    try {
      const qrUrl = await toDataURL(`Pago OXXO - ID de Venta: ${this.ventaId}`, { errorCorrectionLevel: 'H' });
      doc.text(ventaDetails, 10, 10);
      doc.addImage(qrUrl, 'PNG', 10, 30, 50, 50);
      await this.saveFile(doc.output('blob'), 'pago_oxxo.pdf');
    } catch (error) {
      console.error('Error al generar el código QR:', error);
      this.isLoading = false; // Asegurarse de que el spinner se detenga en caso de error
      alert('Error al generar el PDF para OXXO. Intenta de nuevo.');
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
        console.error('Error al guardar el archivo:', error);
        alert('No se pudo guardar el archivo.');
      }
    } else {
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = fileName;
      link.click();
      // No intentamos eliminar el elemento, ya que no lo agregamos al DOM
      URL.revokeObjectURL(url);
    }
  }

  navigateToHome() {
    this.isSuccess = false;
    this.router.navigateByUrl('/tabs/tab1');
  }
}