import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/AuthService';

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

    userName: string | null = null;

    constructor(
        private navCtrl: NavController,
        private authService: AuthService,
        private alertController: AlertController, // Para mostrar la notificación
        private toastController: ToastController // Para mostrar mensajes
    ) {}

    async ngOnInit() {
        this.userName = await this.authService.getUserName();
        console.log('Nombre del usuario:', this.userName);
    }

    openGallery(game: any) {
        this.navCtrl.navigateForward(['/gallery', { images: JSON.stringify(game.gallery), title: game.title }]);
    }

    // Nueva función para confirmar el cierre de sesión
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
                            // Cerrar sesión
                            await this.authService.logout();
                            // Redirigir a la página de login
                            this.navCtrl.navigateRoot('/login');
                            // Mostrar mensaje de éxito
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

    // Función para mostrar mensajes toast
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