import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/AuthService';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage implements OnInit {
  registerForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group(
      {
        nombre: [
          '',
          [
            Validators.required,
            Validators.maxLength(15),
            Validators.pattern('^[a-zA-Z ]+$'),
          ],
        ],
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
            Validators.maxLength(12),
            Validators.pattern('^(?=.*[A-Z])(?=.*[0-9]).{6,}$'),
          ],
        ],
        confirmarContrasena: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit() {
    console.log('RegistroPage inicializado');
  }

  passwordMatchValidator(form: FormGroup) {
    const contrasena = form.get('contrasena')?.value;
    const confirmarContrasena = form.get('confirmarContrasena')?.value;
    return contrasena === confirmarContrasena ? null : { mismatch: true };
  }

  async onRegister() {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.isSubmitting = false;
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Registrando usuario...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      const { nombre, correo, contrasena } = this.registerForm.value;
      console.log('Enviando registro:', { nombre, correo, contrasena });
      await this.authService.register(nombre, correo, contrasena).toPromise();

      const token = await this.authService.login(correo, contrasena).toPromise();
      if (token) {
        console.log('Inicio de sesión automático exitoso, token:', token);
      }

      await loading.dismiss();
      this.router.navigate(['/tabs/tab1']);
    } catch (error) {
      console.error('Error en registro:', error);
      await loading.dismiss();
      alert('Error al registrar usuario: ' + ((error as any).error?.error || 'Error desconocido'));
    } finally {
      this.isSubmitting = false;
    }
  }

  get nombreControl(): FormControl {
    return this.registerForm.get('nombre') as FormControl;
  }

  get correoControl(): FormControl {
    return this.registerForm.get('correo') as FormControl;
  }

  get contrasenaControl(): FormControl {
    return this.registerForm.get('contrasena') as FormControl;
  }

  get confirmarContrasenaControl(): FormControl {
    return this.registerForm.get('confirmarContrasena') as FormControl;
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.registerForm.get(controlName);
    return control ? control.hasError(errorName) && control.touched : false;
  }

  hasMismatchError(): boolean {
    const errors = this.registerForm.errors;
    return this.confirmarContrasenaControl.touched && errors ? 'mismatch' in errors : false;
  }

  isValid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return control ? !control.invalid && control.touched : false;
  }

  isConfirmPasswordValid(): boolean {
    const control = this.confirmarContrasenaControl;
    const errors = this.registerForm.errors;
    const hasMismatch = errors ? 'mismatch' in errors : false;
    return control.touched && !control.invalid && !hasMismatch;
  }
}