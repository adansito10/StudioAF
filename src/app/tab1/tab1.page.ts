import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/AuthService';
import { Router, ActivatedRoute } from '@angular/router'; // Importar Router y ActivatedRoute

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  slides = [
    {
      title: '',
      description: '',
      image: 'assets/images/anuncio2.jpg',
    },
    {
      title: '100% RECOMENDADOS',
      description: '',
      image: 'assets/images/portada.jpg',
    },
    {
      title: 'LOS MEJORES EVENTOS',
      description: '',
      image: 'assets/images/baby15.jpg',
    },
    {
      title: 'FOTOGRAFIA Y VIDEO PROFESIONAL',
      description: '',
      image: 'assets/images/quince20.jpg',
    },
  ];

  games = [
    {
      title: 'Bodas',
      cover: 'assets/images/boda1.jpg',
      gallery: [
        'assets/images/boda1.jpg',
        'assets/images/boda3.jpg',
        'assets/images/boda10.jpg',
        'assets/images/boda11.jpg',
        'assets/images/boda12.jpg',
        'assets/images/boda14.jpg',
        'assets/images/boda15.jpg',
        'assets/images/boda17.jpg',
        'assets/images/boda19.jpg',
        'assets/images/boda20.jpg',
        'assets/images/boda21.jpg',
        'assets/images/boda22.jpg',
        'assets/images/boda23.jpg',
      ],
    },
    {
      title: 'XV AÑOS',
      cover: 'assets/images/quinceaños2.jpg',
      gallery: [
        'assets/images/quinceaños1.jpg',
        'assets/images/quinceaños2.jpg',
        'assets/images/quinceaños3.jpg',
        'assets/images/quince11.jpg',
        'assets/images/quince10.jpg',
        'assets/images/quince12.jpg',
        'assets/images/quince13.jpg',
        'assets/images/quince14.jpg',
        'assets/images/quince15.jpg',
        'assets/images/quince16.jpg',
        'assets/images/quince17.jpg',
        'assets/images/quince18.jpg',
        'assets/images/quince19.jpg',
        'assets/images/quince20.jpg',
      ],
    },
    {
      title: 'Bautizos',
      cover: 'assets/images/bautizo1.jpg',
      gallery: [
        'assets/images/bautizo1.jpg',
        'assets/images/bautizo6.jpg',
        'assets/images/bautizo7.jpg',
        'assets/images/bautizo9.jpg',
      ],
    },
    {
      title: 'Baby Shower',
      cover: 'assets/images/baby11.jpg',
      gallery: [
        'assets/images/baby2.jpg',
        'assets/images/baby1.jpg',
        'assets/images/baby13.jpg',
        'assets/images/baby12.jpg',
        'assets/images/baby14.jpg',
        'assets/images/baby15.jpg',
      ],
    },
  ];

  userName: string | null = null;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router, // Añadido para manejar la navegación
    private route: ActivatedRoute // Añadido para recibir el estado
  ) {}

  async ngOnInit() {
    this.userName = await this.authService.getUserName();
    console.log('Nombre del usuario:', this.userName);

    // Asegurarse de que el video esté silenciado
    const video = document.getElementById('promo-video') as HTMLVideoElement;
    if (video) {
      video.muted = true; // Forzar el silenciamiento
    }

    // Verificar si se debe mostrar el mensaje de agradecimiento
    this.route.queryParams.subscribe(() => {
      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras?.state;
      if (state && state['showThankYouMessage']) {
        this.showThankYouMessage();
      }
    });
  }

  async showThankYouMessage() {
    const toast = await this.toastController.create({
      message: 'Gracias por tu compra, muy pronto un miembro de nuestro equipo se pondrá en contacto contigo para coordinar los detalles.',
      duration: 5000, // Mostrar el mensaje durante 5 segundos
      color: 'success',
      position: 'top',
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  openGallery(game: any) {
    this.navCtrl.navigateForward(['/gallery', { images: JSON.stringify(game.gallery), title: game.title }]);
  }

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cierre de sesión cancelado');
          },
        },
        {
          text: 'Sí',
          handler: async () => {
            try {
              await this.authService.logout();
              this.navCtrl.navigateRoot('/login');
              this.presentToast('Sesión cerrada exitosamente', 'success');
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
              this.presentToast('Error al cerrar sesión', 'danger');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
    });
    await toast.present();
  }
}