import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
  standalone:false 
})
export class FormularioPage implements OnInit {
  constructor(private navCtrl: NavController) { }
  ngOnInit(): void {
  }

  editarDomicilio() {
    // Aquí puedes implementar la lógica para editar el domicilio
    this.navCtrl.navigateForward('/editar-domicilio');
  }

}
