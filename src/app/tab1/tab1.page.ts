import { Component, OnInit } from '@angular/core'; // Añadimos OnInit
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/AuthService'; // Importamos AuthService

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit { // Implementamos OnInit
  slides = [
    {
      title: '',
      description: '',
      image: 'assets/images/anuncio2.jpg',
    },
    {
      title: '100% RECOMENDADOS',
      description: '',
      image: 'assets/images/familiar1.jpg',
    },
    {
      title: 'Tus recuerdos capturados',
      description: '',
      image: 'assets/images/quinceaños2.jpg',
    },
  ];

  games = [
    {
      title: 'Bodas',
      cover: 'assets/images/boda1.jpg',
      gallery: ['assets/images/boda1.jpg', 'assets/images/boda2.jpg', 'assets/images/boda3.jpg'],
    },
    {
      title: 'XV AÑOS',
      cover: 'assets/images/quinceaños2.jpg',
      gallery: [
        'assets/images/quinceaños1.jpg',
        'assets/images/quinceaños2.jpg',
        'assets/images/quinceaños3.jpg',
      ],
    },
    {
      title: 'Bautizos',
      cover: 'assets/images/bautizo1.jpg',
      gallery: ['assets/images/bautizo1.jpg'],
    },
    {
      title: 'Baby Shower',
      cover: 'assets/images/baby2.jpg',
      gallery: ['assets/images/baby1.jpg', 'assets/images/baby2.jpg'],
    },
  ];

  userName: string | null = null; // Propiedad para almacenar el nombre del usuario

  constructor(private navCtrl: NavController, private authService: AuthService) {} // Inyectamos AuthService

  async ngOnInit() {
    this.userName = await this.authService.getUserName(); // Obtenemos el nombre del usuario
    console.log('Nombre del usuario:', this.userName);
  }

  openGallery(game: any) {
    this.navCtrl.navigateForward(['/gallery', { images: JSON.stringify(game.gallery), title: game.title }]);
  }
}