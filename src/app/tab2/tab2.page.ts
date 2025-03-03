import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  servicios: any[] = [
    {
      titulo: 'Paquete de Bodas',
      descripcion: 'Explora nuestro paquete de bodas que tenemos para ti.',
      imagen: 'assets/images/boda4.jpg',
      video: 'assets/videos/paquete-bodas.mp4' 
    },
    {
      titulo: 'Paquete de XV Años',
      descripcion: 'Haz que tus quinceaños quede marcado para siempre.',
      imagen: 'assets/images/quinceaños2.jpg',
      video: 'assets/videos/paquete-xv.mp4' 
    },
    {
      titulo: 'Paquete BabyShower',
      descripcion: 'Recuerda el genero de tu bebe con nuestas fotos.',
      imagen: 'assets/images/baby1.jpg',
      video: 'assets/videos/paquete-infantil.mp4' 
    },
    {
      titulo: 'Paquete Familiar',
      descripcion: 'Reune a tu familia y enmarca el momento con nuestras fotos.',
      imagen: 'assets/images/familiar1.jpg',
      video: 'assets/videos/paquete-infantil.mp4' // URL del video
    },
    {
      titulo: 'Paquete Bautizo',
      descripcion: 'Recuerda el bautizo de tu hijo con nuetro paquete de fotos.',
      imagen: 'assets/images/bautizo1.jpg',
      video: 'assets/videos/paquete-infantil.mp4' // URL del video
    }
  ];


  
  constructor() { }

  ngOnInit() {}
}