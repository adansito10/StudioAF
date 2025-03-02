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
      descripcion: 'Sesión fotográfica profesional con entrega de 50 fotos de alta calidad.',
      imagen: 'assets/images/boda4.jpg',
      video: 'assets/videos/paquete-bodas.mp4' 
    },
    {
      titulo: 'Paquete de XV Años',
      descripcion: 'Incluye sesión fotográfica con cambio de vestuario y 40 fotos editadas.',
      imagen: 'assets/images/quinceaños2.jpg',
      video: 'assets/videos/paquete-xv.mp4' 
    },
    {
      titulo: 'Paquete BabyShower',
      descripcion: 'Fotografías temáticas para niños con mini álbum impreso.',
      imagen: 'assets/images/baby1.jpg',
      video: 'assets/videos/paquete-infantil.mp4' // URL del video
    },
    {
      titulo: 'Paquete Familiar',
      descripcion: 'Fotografías temáticas para niños con mini álbum impreso.',
      imagen: 'assets/images/familiar1.jpg',
      video: 'assets/videos/paquete-infantil.mp4' // URL del video
    },
    {
      titulo: 'Paquete Bautizo',
      descripcion: 'Fotografías temáticas para niños con mini álbum impreso.',
      imagen: 'assets/images/bautizo1.jpg',
      video: 'assets/videos/paquete-infantil.mp4' // URL del video
    }
  ];


  
  constructor() { }

  ngOnInit() {}
}