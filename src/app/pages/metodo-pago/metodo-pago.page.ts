import { Component, OnInit, AfterViewInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { toDataURL } from 'qrcode';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Platform, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

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
  paymentForm: FormGroup;
  showCookieWarning: boolean = false;

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

  isLoading: boolean = false;
  isSuccess: boolean = false;
  ultimaTransaccion: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private platform: Platform,
    private fb: FormBuilder,
    private toastController: ToastController
  ) {
    this.isWeb = !this.platform.is('capacitor');

    const currentYear = new Date().getFullYear();
    const minYearValidator: ValidatorFn = (control: AbstractControl) => {
      const year = parseInt(control.value, 10);
      return year >= currentYear ? null : { invalidYear: true };
    };

    this.paymentForm = this.fb.group({
      nombreTarjeta: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]+$')
      ]],
      numeroTarjeta: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{16}$')
      ]],
      expiracionMes: ['', [
        Validators.required
      ]],
      expiracionYear: ['', [
        Validators.required,
        minYearValidator
      ]],
      cvv: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{3}$')
      ]]
    });
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
      this.loadPayPalScript().catch((error) => {
        console.error('Error al cargar PayPal SDK en ngAfterViewInit:', error);
      });
    }
  }

  selectPaymentMethod(method: string) {
    this.selectedMethod = method;
    this.selectedMethodName = this.getPaymentMethodName(method);

    if (method === 'tarjetaDebito' && this.isWeb) {
      this.loadPayPalScript()
        .then(() => {
          if (this.paypalScriptLoaded && paypal) {
            this.renderPayPalButton();
            if (!this.areThirdPartyCookiesEnabled()) {
              this.showCookieWarning = true;
            }
          } else {
            console.error('PayPal SDK no está disponible después de cargar el script.');
            this.showToast('No se pudo cargar PayPal. Intenta de nuevo.', 'danger');
          }
        })
        .catch((error) => {
          console.error('Error al cargar PayPal SDK al seleccionar método:', error);
        });
    } else {
      this.showCookieWarning = false;
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
      await this.showToast('Error: El precio total no es válido. Por favor, regresa y selecciona un servicio.', 'danger');
      this.router.navigate(['/formulario']);
      return;
    }

    this.isLoading = true;

    try {
      console.log('Método seleccionado:', this.selectedMethod);
      if (this.selectedMethod === 'tarjetaCredito') {
        if (this.paymentForm.invalid) {
          this.paymentForm.markAllAsTouched();
          await this.showToast('Por favor, completa correctamente los datos de la tarjeta.', 'danger');
          return;
        }
        console.log('Pago con tarjeta de crédito:', this.paymentForm.value);
        await this.generatePaymentReceipt();

        this.ultimaTransaccion = {
          id: this.ventaId,
          fecha: new Date().toLocaleString(),
          metodoPago: this.selectedMethodName,
          paquete: this.paqueteSeleccionado.nombre,
          monto: this.paqueteSeleccionado.precio,
          moneda: 'MXN',
          estado: 'Completado',
        };
        console.log('ultimaTransaccion asignada (tarjetaCredito):', this.ultimaTransaccion);

        this.isSuccess = true;
      } else if (this.selectedMethod === 'oxxo') {
        await this.generatePdfWithQRCode();

        this.ultimaTransaccion = {
          id: this.ventaId,
          fecha: new Date().toLocaleString(),
          metodoPago: this.selectedMethodName,
          paquete: this.paqueteSeleccionado.nombre,
          monto: this.paqueteSeleccionado.precio,
          moneda: 'MXN',
          estado: 'Pendiente',
        };
        console.log('ultimaTransaccion asignada (oxxo):', this.ultimaTransaccion);

        this.isSuccess = true;
      }
    } catch (error) {
      console.error('Error en submitPayment:', error);
      await this.showToast('Ocurrió un error al procesar el pago. Por favor, intenta de nuevo.', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  async compartirCompra() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '¡Acabo de contratar un servicio con Studio AF!',
          text: `Contraté el ${this.paqueteSeleccionado.nombre} con Studio AF. ¡Recomiendo sus servicios!`,
          url: 'https://studioaf.com'
        });
        await this.showToast('¡Gracias por compartir tu compra!', 'success');
      } catch (error) {
        console.error('Error al compartir:', error);
        await this.showToast('No se pudo compartir. Intenta de nuevo.', 'danger');
      }
    } else {
      await this.showToast('La función de compartir no está disponible en tu dispositivo.', 'warning');
    }
  }

  navigateToHome() {
    this.isSuccess = false;
    const navigationExtras: NavigationExtras = {
      state: {
        showThankYouMessage: true
      }
    };
    this.router.navigateByUrl('/tabs/tab1', navigationExtras);
  }

  navigateToHistorial() {
    if (this.ultimaTransaccion) {
      console.log('Navegando a historial-pedidos con queryParams:', this.ultimaTransaccion);
      this.router.navigate(['/historial'], { queryParams: this.ultimaTransaccion });
    } else {
      this.showToast('No hay datos de transacción para mostrar.', 'warning');
    }
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }

  private loadPayPalScript(): Promise<void> {
    if (this.paypalScriptLoaded) return Promise.resolve();

    const baseUrl = 'https://www.paypal.com/sdk/js';
    const params = new URLSearchParams({
      'client-id': this.clientId,
      'currency': 'USD'
    });
    const scriptUrl = `${baseUrl}?${params.toString()}`;

    console.log('Intentando cargar PayPal SDK con URL:', scriptUrl);

    return fetch(scriptUrl, { method: 'HEAD' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error al probar la URL de PayPal: ${response.status} ${response.statusText}`);
        }
        console.log('URL de PayPal es accesible:', response.status);
        return new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = scriptUrl;
          script.async = true;
          script.onload = () => {
            this.paypalScriptLoaded = true;
            console.log('SDK de PayPal cargado correctamente');
            resolve();
          };
          script.onerror = (error) => {
            console.error('Error al cargar el SDK de PayPal:', error);
            console.error('URL intentada:', script.src);
            this.showToast('No se pudo cargar PayPal. Verifica tu conexión o el Client ID.', 'danger');
            reject(error);
          };
          document.body.appendChild(script);
        });
      })
      .catch(error => {
        console.error('Error al probar la URL de PayPal:', error);
        this.showToast('No se pudo cargar PayPal. Verifica tu conexión o el Client ID.', 'danger');
        throw error;
      });
  }

  private renderPayPalButton() {
    const paypalContainer = document.getElementById('paypal-button-container');
    if (!paypalContainer) {
      console.error('Contenedor de PayPal no encontrado. Asegúrate de que <div id="paypal-button-container"></div> esté en el template.');
      this.showToast('Error al mostrar el botón de PayPal. Contenedor no encontrado.', 'danger');
      return;
    }

    if (this.paypalScriptLoaded && typeof paypal !== 'undefined' && paypal.Buttons) {
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
            return actions.order.capture().then(async (details: any) => {
              console.log('Pago completado:', details);
              this.showToast(`¡Pago exitoso con PayPal! ID de transacción: ${details.id}`, 'success');
              this.isLoading = true;

              try {
                await this.generatePaymentReceipt();

                this.ultimaTransaccion = {
                  id: details.id,
                  fecha: new Date().toLocaleString(),
                  metodoPago: this.selectedMethodName,
                  paquete: this.paqueteSeleccionado.nombre,
                  monto: this.paqueteSeleccionado.precio,
                  moneda: 'USD',
                  estado: 'Completado',
                };
                console.log('ultimaTransaccion asignada (PayPal):', this.ultimaTransaccion);

                this.isSuccess = true;
              } catch (error) {
                console.error('Error después de capturar el pago:', error);
                this.showToast('Error al generar el comprobante.', 'danger');
              } finally {
                this.isLoading = false;
              }
            });
          },
          onError: (err: any) => {
            console.error('Error en el pago con PayPal:', err);
            this.showToast('Error al procesar el pago con PayPal. Intenta de nuevo.', 'danger');
          },
        }).render('#paypal-button-container');
      } catch (error) {
        console.error('Error al renderizar el botón de PayPal:', error);
        this.showToast('Error al mostrar el botón de PayPal.', 'danger');
      }
    } else {
      console.error('No se puede renderizar el botón de PayPal. Script cargado:', this.paypalScriptLoaded);
      console.error('PayPal SDK disponible:', typeof paypal !== 'undefined' ? 'Sí' : 'No');
      this.showToast('No se pudo cargar el botón de PayPal. Intenta de nuevo.', 'danger');
    }
  }

  private areThirdPartyCookiesEnabled(): boolean {
    return navigator.cookieEnabled;
  }

  private async loadImageAsBase64(url: string): Promise<string> {
    try {
      if (url.startsWith('assets/')) {
        console.warn('Archivos locales en "assets" no son accesibles directamente con fetch en Capacitor. Usando URL pública de respaldo.');
        url = 'https://via.placeholder.com/100x50.png?text=Logo+Empresa';
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error al cargar la imagen: ${response.statusText}`);
      }
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
    
    const primaryColor = '#1a73e8';
    const secondaryColor = '#333333';
    const accentColor = '#e0e0e0';

    const logoUrl = 'https://via.placeholder.com/100x50.png?text=Logo+Empresa';
    const logoBase64 = await this.loadImageAsBase64(logoUrl);

    if (logoBase64) {
      doc.addImage(logoBase64, 'PNG', 10, 10, 50, 25);
    }
    doc.setFontSize(20);
    doc.setTextColor(primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('Comprobante de Pago', 140, 20, { align: 'right' });

    doc.setLineWidth(0.5);
    doc.setDrawColor(primaryColor);
    doc.line(10, 40, 200, 40);

    doc.setFontSize(12);
    doc.setTextColor(secondaryColor);
    doc.setFont('helvetica', 'normal');
    doc.text('Nombre de la Empresa: Studio AF', 10, 50);
    doc.text('Dirección: Centro, 94303, Orizaba, Veracruz, Mexico', 10, 60);
    doc.text('Correo: studio.af@gmail.com', 10, 70);
    doc.text('Teléfono: +52 272 203 2276', 10, 80);

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

    doc.setFontSize(14);
    doc.setTextColor(primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('Información de Pago', 10, 170);

    doc.setFontSize(12);
    doc.setTextColor(secondaryColor);
    doc.setFont('helvetica', 'normal');
    if (this.selectedMethod === 'tarjetaCredito') {
      doc.text(`Nombre en la Tarjeta: ${this.paymentForm.get('nombreTarjeta')?.value}`, 10, 180);
      doc.text(`Número de Tarjeta: **** **** **** ${this.paymentForm.get('numeroTarjeta')?.value.slice(-4)}`, 10, 190);
      doc.text(`Fecha de Expiración: ${this.paymentForm.get('expiracionMes')?.value}/${this.paymentForm.get('expiracionYear')?.value}`, 10, 200);
    } else if (this.selectedMethod === 'tarjetaDebito') {
      doc.text('Método: PayPal', 10, 180);
      doc.text('Estado: Pago Completado', 10, 190);
    }

    doc.setFillColor(accentColor);
    doc.rect(0, 270, 210, 30, 'F');
    doc.setFontSize(10);
    doc.setTextColor(secondaryColor);
    doc.text('Gracias por tu compra. Si tienes alguna duda, contáctanos.', 105, 280, { align: 'center' });
    doc.text('© 2025 Studio AF Todos los derechos reservados.', 105, 290, { align: 'center' });

    await this.saveFile(doc.output('blob'), 'comprobante_pago.pdf');
  }

  async generatePdfWithQRCode() {
    const doc = new jsPDF();
    
    const primaryColor = '#1a73e8';
    const secondaryColor = '#333333';
    const accentColor = '#e0e0e0';

    const logoUrl = 'https://via.placeholder.com/100x50.png?text=Logo+Empresa';
    let logoBase64: string;
    try {
      logoBase64 = await this.loadImageAsBase64(logoUrl);
      if (logoBase64) {
        doc.addImage(logoBase64, 'PNG', 10, 10, 50, 25);
      } else {
        console.warn('No se pudo cargar el logo, continuando sin él.');
      }
    } catch (error) {
      console.error('Error al cargar el logo:', error);
    }

    doc.setFontSize(20);
    doc.setTextColor(primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text('Instrucciones de Pago en OXXO', 140, 20, { align: 'right' });

    doc.setLineWidth(0.5);
    doc.setDrawColor(primaryColor);
    doc.line(10, 40, 200, 40);

    doc.setFontSize(12);
    doc.setTextColor(secondaryColor);
    doc.setFont('helvetica', 'normal');
    doc.text('Nombre de la Empresa: Studio AF', 10, 50);
    doc.text('Dirección: Ntc.1446. centro, Orizaba, Veracruz, Mexico', 10, 60);
    doc.text('Correo: studio.af30@gmail.com', 10, 70);
    doc.text('Teléfono: +52 272 203 2276', 10, 80);

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

    try {
      const qrUrl = await toDataURL(`Pago OXXO - ID de Venta: ${this.ventaId}`, { errorCorrectionLevel: 'H' });
      doc.setFontSize(14);
      doc.setTextColor(primaryColor);
      doc.setFont('helvetica', 'bold');
      doc.text('Escanea este código QR en OXXO para pagar', 10, 170);

      doc.addImage(qrUrl, 'PNG', 10, 180, 50, 50);

      doc.setFontSize(12);
      doc.setTextColor(secondaryColor);
      doc.setFont('helvetica', 'normal');
      doc.text('Instrucciones:', 70, 180);
      doc.text('1. Visita tu tienda OXXO más cercana.', 70, 190);
      doc.text('2. Escanea el código QR en la terminal de pago.', 70, 200);
      doc.text(`3. Paga el monto exacto de $${this.paqueteSeleccionado.precio.toFixed(2)} MXN.`, 70, 210);
      doc.text('4. Guarda el comprobante que te entreguen.', 70, 220);
      doc.text('5. Tu pago será confirmado en un plazo de 24-48 horas.', 70, 230);

      doc.setFontSize(12);
      doc.setTextColor(primaryColor);
      doc.setFont('helvetica', 'bold');
      doc.text(`Número de Referencia: ${this.ventaId}`, 70, 250);

      doc.setFillColor(accentColor);
      doc.rect(0, 270, 210, 30, 'F');
      doc.setFontSize(10);
      doc.setTextColor(secondaryColor);
      doc.text('Gracias por tu compra. Si tienes alguna duda, contáctanos.', 105, 280, { align: 'center' });
      doc.text('© 2025 Studio AF. Todos los derechos reservados.', 105, 290, { align: 'center' });

      await this.saveFile(doc.output('blob'), 'pago_oxxo.pdf');
    } catch (error) {
      console.error('Error al generar el PDF para OXXO:', error);
      throw new Error('No se pudo generar el PDF para OXXO. Intenta de nuevo.');
    }
  }

  async saveFile(blob: Blob, fileName: string) {
    if (this.platform.is('capacitor') || this.platform.is('cordova')) {
      try {
        const permissions = await Filesystem.checkPermissions();
        console.log('Permisos actuales:', permissions);

        if (permissions.publicStorage !== 'granted') {
          const permissionRequest = await Filesystem.requestPermissions();
          if (permissionRequest.publicStorage !== 'granted') {
            throw new Error('No se otorgaron permisos para escribir en el almacenamiento.');
          }
        }

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

        const uriResult = await Filesystem.getUri({
          path: fileName,
          directory: Directory.Documents
        });

        await this.showToast(`Archivo guardado en: ${uriResult.uri}`, 'success');
      } catch (error) {
        console.error('Error al guardar el archivo en el dispositivo:', error);
        await this.showToast('No se pudo guardar el archivo en el dispositivo.', 'danger');
        throw error;
      }
    } else {
      try {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        await this.showToast('Archivo descargado correctamente.', 'success');
      } catch (error) {
        console.error('Error al descargar el archivo en la web:', error);
        await this.showToast('No se pudo descargar el archivo.', 'danger');
        throw error;
      }
    }
  }
}