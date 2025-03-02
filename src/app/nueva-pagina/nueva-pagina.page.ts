import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nueva-pagina',
  templateUrl: './nueva-pagina.page.html',
  styleUrls: ['./nueva-pagina.page.scss'],
  standalone: false
})
export class NuevaPaginaPage implements OnInit {
  formulario = {
    horasExtras: '',
    camarografoExtra: false,
    setGrabacion: false,
    videoEvento: false,
    fecha: '',
    hora: '',
  };

  datosServicio: any = {}; // Almacenar los datos del servicio

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Guardamos los datos existentes del servicio para que no se pierdan
    this.route.queryParams.subscribe(params => {
      this.datosServicio = { ...params }; // Copia los parámetros actuales
    });
  }

  enviarFormulario() {
    this.router.navigate(['/detalle-servicio'], {
      queryParams: {
        ...this.datosServicio, // Mantiene los datos originales del servicio
        horasExtras: this.formulario.horasExtras,
        camarografoExtra: this.formulario.camarografoExtra,
        setGrabacion: this.formulario.setGrabacion,
        videoEvento: this.formulario.videoEvento,
        fecha: this.formulario.fecha,
        hora: this.formulario.hora,
      },
      queryParamsHandling: 'merge' // Mantiene los parámetros previos y solo actualiza los nuevos
    });
  }
}
