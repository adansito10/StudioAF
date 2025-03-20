import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular'; // Importa LoadingController
import { AuthService } from 'src/app/services/AuthService';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage {
  nombre: string = '';
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController // Inyecta LoadingController
  ) {
    console.log('Constructor de RegistroPage ejecutado');
  }

  ngOnInit() {
    console.log('RegistroPage inicializado');
  }

  async onRegister() {
    if (this.contrasena !== this.confirmarContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Crea y muestra el spinner
    const loading = await this.loadingController.create({
      message: 'Registrando usuario...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      console.log('Enviando registro:', { nombre: this.nombre, correo: this.correo, contrasena: this.contrasena });
      await this.authService.register(this.nombre, this.correo, this.contrasena).toPromise();
      await loading.dismiss(); 
      this.router.navigate(['/tabs/tab1']);
    } catch (error) {
      console.error('Error en registro:', error);
      await loading.dismiss(); 
      alert('Error al registrar usuario: ' + ((error as any).error?.error || 'Error desconocido'));
    }
  }
}