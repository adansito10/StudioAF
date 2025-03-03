import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  slides = [
    {
      title: '',
      description: '',
      image: 'assets/images/anuncio2.jpg'
    },
    {
      title: '100% RECOMENDADOS',
      description: '',
      image: 'assets/images/familiar1.jpg'
    },
    {
      title: 'Tus recuerdos capturados',
      description: '',
      image: 'assets/images/quinceaños2.jpg'
    }
  ];

  games = [
    {
      title: 'Bodas',
      cover: 'assets/images/boda1.jpg',
      gallery: [
        'assets/images/boda1.jpg',
        'assets/images/boda2.jpg',
        'assets/images/boda3.jpg',
      ]
    },
    {
      title: 'XV AÑOS',
      cover: 'assets/images/quinceaños2.jpg',
      gallery: [
        'assets/images/quinceaños1.jpg',
        'assets/images/quinceaños2.jpg',
        'assets/images/quinceaños3.jpg',
      ]
    },
    {
      title: 'Bautizos',
      cover: 'assets/images/bautizo1.jpg',
      gallery: [
        'assets/images/bautizo1.jpg',

      ]
    },
    {
      title: 'Baby Shower',
      cover: 'assets/images/baby2.jpg',
      gallery: [
        'assets/images/baby1.jpg',
        'assets/images/baby2.jpg',
    
      ]
    }
  ];

  constructor(private navCtrl: NavController) {}

  openGallery(game: any) {
    this.navCtrl.navigateForward(['/gallery', { images: JSON.stringify(game.gallery), title: game.title }]);
  }

}