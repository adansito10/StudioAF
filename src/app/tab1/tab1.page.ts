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
      title: 'STUDIO AF',
      description: '',
      image: 'https://images.unsplash.com/photo-1564754943164-e83c08469116?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmVydGljYWx8ZW58MHx8MHx8fDA%3D'
    },
    {
      title: 'Second Slide',
      description: '',
      image: 'https://images.unsplash.com/photo-1564754943164-e83c08469116?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmVydGljYWx8ZW58MHx8MHx8fDA%3D'
    },
    {
      title: 'Third Slide',
      description: '',
      image: 'https://images.unsplash.com/photo-1564754943164-e83c08469116?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmVydGljYWx8ZW58MHx8MHx8fDA%3D'
    }
  ];

  games = [
    {
      title: 'Bodas',
      cover: 'https://images.unsplash.com/photo-1564754943164-e83c08469116?w=1000&auto=format&fit=crop&q=60',
      gallery: [
        'https://via.placeholder.com/600x400?text=Game1-1',
        'https://via.placeholder.com/600x400?text=Game1-2',
        'https://via.placeholder.com/600x400?text=Game1-3'
      ]
    },
    {
      title: 'Game 2',
      cover: 'https://images.unsplash.com/photo-1564754943164-e83c08469116?w=1000&auto=format&fit=crop&q=60',
      gallery: [
        'https://via.placeholder.com/600x400?text=Game2-1',
        'https://via.placeholder.com/600x400?text=Game2-2',
        'https://via.placeholder.com/600x400?text=Game2-3'
      ]
    },
    {
      title: 'Game 3',
      cover: 'https://images.unsplash.com/photo-1564754943164-e83c08469116?w=1000&auto=format&fit=crop&q=60',
      gallery: [
        'https://via.placeholder.com/600x400?text=Game3-1',
        'https://via.placeholder.com/600x400?text=Game3-2',
        'https://via.placeholder.com/600x400?text=Game3-3'
      ]
    }
  ];

  constructor(private navCtrl: NavController) {}

  openGallery(game: any) {
    this.navCtrl.navigateForward(['/gallery', { images: JSON.stringify(game.gallery), title: game.title }]);
  }

}