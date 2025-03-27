import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/AuthService';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isSubmitting: boolean = false;
  showPassword: boolean = false; // Variable para controlar la visibilidad de la contraseña

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      correo: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
        ],
      ],
      contrasena: [
        '',
        [
          Validators.required,
        ],
      ],
    });
  }

  ngOnInit() {
    console.log('LoginPage inicializado');
  }

  async onLogin() {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.isSubmitting = false;
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      const { correo, contrasena } = this.loginForm.value;
      console.log('Intentando login con:', { correo, contrasena });
      const token = await this.authService.login(correo, contrasena).toPromise();
      if (token) {
        console.log('Login exitoso, token:', token);
        await loading.dismiss();
        this.router.navigate(['/tabs/tab1']);
      }
    } catch (error) {
      console.error('Error completo en login:', error);
      await loading.dismiss();
      const errorMessage = (error as any).error?.error || 'Error desconocido';
      alert('Error al iniciar sesión: ' + errorMessage);
    } finally {
      this.isSubmitting = false;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Alternar el estado de visibilidad
  }

  get correoControl(): FormControl {
    return this.loginForm.get('correo') as FormControl;
  }

  get contrasenaControl(): FormControl {
    return this.loginForm.get('contrasena') as FormControl;
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.loginForm.get(controlName);
    return control ? control.hasError(errorName) && control.touched : false;
  }

  isValid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return control ? !control.invalid && control.touched : false;
  }
}