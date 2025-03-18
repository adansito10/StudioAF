import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular'; // Importa LoadingController
import { AuthService } from 'src/app/services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  correo: string = '';
  contrasena: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController // Inyecta LoadingController
  ) {
    console.log('Constructor de LoginPage ejecutado');
  }

  ngOnInit() {
    console.log('LoginPage inicializado');
  }

  async onLogin() {
    // Crea y muestra el spinner
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent', // Tipo de spinner (puedes usar 'dots', 'lines', etc.)
    });
    await loading.present();

    try {
      console.log('Intentando login con:', { correo: this.correo, contrasena: this.contrasena });
      const token = await this.authService.login(this.correo, this.contrasena).toPromise();
      if (token) {
        console.log('Login exitoso, token:', token);
        // No mostramos mensaje, solo redirigimos
        await loading.dismiss(); // Cierra el spinner
        this.router.navigate(['/tabs/tab1']);
      }
    } catch (error) {
      console.error('Error completo en login:', error);
      await loading.dismiss(); // Cierra el spinner incluso si hay error
      const errorMessage = (error as any).message || 'Error desconocido';
      alert('Error al iniciar sesión: ' + errorMessage);
    }
  }
}