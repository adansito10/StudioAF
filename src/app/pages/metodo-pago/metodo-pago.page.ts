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

  private clientId = 'ATIofl8OUzubLTHl2IN2maj2n2CQz23k2Htk6VKejP6wf9Sa8Myg3bskj_ejS0slc5cWNvAgX_L4X_dt'; // Reemplaza con tu Client ID válido
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

    // Construir la URL asegurándonos de que los parámetros estén correctamente codificados
    const scriptUrl = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(this.clientId)}&currency=USD`;

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

  // Función auxiliar para cargar el logo de la empresa
  private async loadImageAsBase64(url: string): Promise<string> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
      return '';
    }
  }

  async generatePaymentReceipt() {
    const doc = new jsPDF();
    
    // Colores y estilos
    const primaryColor = '#1a73e8'; // Azul similar al de Steam
    const secondaryColor = '#333333'; // Gris oscuro para texto
    const accentColor = '#e0e0e0'; // Gris claro para fondos

    // Cargar el logo de la empresa (reemplaza con la URL o ruta de tu logo)
    const logoUrl = 'https://via.placeholder.com/100x50.png?text=Logo+Empresa'; // URL de ejemplo
    const logoBase64 = await this.loadImageAsBase64(logoUrl);

    // Encabezado
    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', 10, 10, 50, 25); // Logo en la esquina superior izquierda
    }
    doc.setFontSize(20);
    doc.setTextColor(primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('Comprobante de Pago', 140, 20, { align: 'right' });

    // Línea divisoria
    doc.setLineWidth(0.5);
    doc.setDrawColor(primaryColor);
    doc.line(10, 40, 200, 40);

    // Información de la empresa
    doc.setFontSize(12);
    doc.setTextColor(secondaryColor);
    doc.setFont('helvetica', 'normal');
    doc.text('Nombre de la Empresa: Eventos Especiales S.A.', 10, 50);
    doc.text('Dirección: Av. Principal 123, Ciudad, País', 10, 60);
    doc.text('Correo: contacto@eventosespeciales.com', 10, 70);
    doc.text('Teléfono: +52 123 456 7890', 10, 80);

    // Detalles de la transacción
    doc.setFontSize(14);
    doc.setTextColor(primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('Detalles de la Transacción', 10, 100);

    doc.setFontSize(12);
    doc.setTextColor(secondaryColor);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha: ${new Date().toLocaleString()}`, 10, 110);
    doc.text(`ID de Venta: ${this.ventaId}`, 10, 120);
    doc.text(`Paquete: ${this.paqueteSeleccionado.nombre}`, 10, 130);
    doc.text(`Total: $${this.paqueteSeleccionado.precio.toFixed(2)} MXN`, 10, 140);
    doc.text(`Método de Pago: ${this.selectedMethodName}`, 10, 150);

    // Detalles del método de pago (tarjeta o PayPal)
    doc.setFontSize(14);
    doc.setTextColor(primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('Información de Pago', 10, 170);

    doc.setFontSize(12);
    doc.setTextColor(secondaryColor);
    doc.setFont('helvetica', 'normal');
    if (this.selectedMethod === 'tarjetaCredito') {
      doc.text(`Nombre en la Tarjeta: ${this.formData.nombreTarjeta}`, 10, 180);
      doc.text(`Número de Tarjeta: **** **** **** ${this.formData.numeroTarjeta.slice(-4)}`, 10, 190);
      doc.text(`Fecha de Expiración: ${this.formData.expiracionMes}/${this.formData.expiracionYear}`, 10, 200);
    } else if (this.selectedMethod === 'tarjetaDebito') {
      doc.text('Método: PayPal', 10, 180);
      doc.text('Estado: Pago Completado', 10, 190);
    }

    // Pie de página
    doc.setFillColor(accentColor);
    doc.rect(0, 270, 210, 30, 'F'); // Fondo gris claro
    doc.setFontSize(10);
    doc.setTextColor(secondaryColor);
    doc.text('Gracias por tu compra. Si tienes alguna duda, contáctanos.', 105, 280, { align: 'center' });
    doc.text('© 2025 Eventos Especiales S.A. Todos los derechos reservados.', 105, 290, { align: 'center' });

    // Guardar el PDF
    await this.saveFile(doc.output('blob'), 'comprobante_pago.pdf');
  }

  async generatePdfWithQRCode() {
    const doc = new jsPDF();
    
    // Colores y estilos
    const primaryColor = '#1a73e8'; // Azul similar al de Steam
    const secondaryColor = '#333333'; // Gris oscuro para texto
    const accentColor = '#e0e0e0'; // Gris claro para fondos

    // Cargar el logo de la empresa (reemplaza con la URL o ruta de tu logo)
    const logoUrl = 'https://via.placeholder.com/100x50.png?text=Logo+Empresa'; // URL de ejemplo
    const logoBase64 = await this.loadImageAsBase64(logoUrl);

    // Encabezado
    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', 10, 10, 50, 25); // Logo en la esquina superior izquierda
    }
    doc.setFontSize(20);
    doc.setTextColor(primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('Instrucciones de Pago en OXXO', 140, 20, { align: 'right' });

    // Línea divisoria
    doc.setLineWidth(0.5);
    doc.setDrawColor(primaryColor);
    doc.line(10, 40, 200, 40);

    // Información de la empresa
    doc.setFontSize(12);
    doc.setTextColor(secondaryColor);
    doc.setFont('helvetica', 'normal');
    doc.text('Nombre de la Empresa: Eventos Especiales S.A.', 10, 50);
    doc.text('Dirección: Av. Principal 123, Ciudad, País', 10, 60);
    doc.text('Correo: contacto@eventosespeciales.com', 10, 70);
    doc.text('Teléfono: +52 123 456 7890', 10, 80);

    // Detalles de la transacción
    doc.setFontSize(14);
    doc.setTextColor(primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('Detalles de la Transacción', 10, 100);

    doc.setFontSize(12);
    doc.setTextColor(secondaryColor);
    doc.setFont('helvetica', 'normal');
    doc.text(`Fecha: ${new Date().toLocaleString()}`, 10, 110);
    doc.text(`ID de Venta: ${this.ventaId}`, 10, 120);
    doc.text(`Paquete: ${this.paqueteSeleccionado.nombre}`, 10, 130);
    doc.text(`Total: $${this.paqueteSeleccionado.precio.toFixed(2)} MXN`, 10, 140);
    doc.text(`Método de Pago: ${this.selectedMethodName}`, 10, 150);

    // Código QR para el pago en OXXO
    try {
      const qrUrl = await toDataURL(`Pago OXXO - ID de Venta: ${this.ventaId}`, { errorCorrectionLevel: 'H' });
      doc.setFontSize(14);
      doc.setTextColor(primaryColor);
      doc.setFont('helvetica', 'bold');
      doc.text('Escanea este código QR en OXXO para pagar', 10, 170);

      doc.addImage(qrUrl, 'PNG', 10, 180, 50, 50);

      // Instrucciones para el pago en OXXO
      doc.setFontSize(12);
      doc.setTextColor(secondaryColor);
      doc.setFont('helvetica', 'normal');
      doc.text('Instrucciones:', 70, 180);
      doc.text('1. Visita tu tienda OXXO más cercana.', 70, 190);
      doc.text('2. Escanea el código QR en la terminal de pago.', 70, 200);
      doc.text(`3. Paga el monto exacto de $${this.paqueteSeleccionado.precio.toFixed(2)} MXN.`, 70, 210);
      doc.text('4. Guarda el comprobante que te entreguen.', 70, 220);
      doc.text('5. Tu pago será confirmado en un plazo de 24-48 horas.', 70, 230);

      // Número de referencia
      doc.setFontSize(12);
      doc.setTextColor(primaryColor);
      doc.setFont('helvetica', 'bold');
      doc.text(`Número de Referencia: ${this.ventaId}`, 70, 250);

      // Pie de página
      doc.setFillColor(accentColor);
      doc.rect(0, 270, 210, 30, 'F'); // Fondo gris claro
      doc.setFontSize(10);
      doc.setTextColor(secondaryColor);
      doc.text('Gracias por tu compra. Si tienes alguna duda, contáctanos.', 105, 280, { align: 'center' });
      doc.text('© 2025 Eventos Especiales S.A. Todos los derechos reservados.', 105, 290, { align: 'center' });

      // Guardar el PDF
      await this.saveFile(doc.output('blob'), 'pago_oxxo.pdf');
    } catch (error) {
      console.error('Error al generar el código QR:', error);
      this.isLoading = false; // Asegurarse de que el spinner se detenga en caso de error
      alert('Error al generar el PDF para OXXO. Intenta de nuevo.');
    }
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