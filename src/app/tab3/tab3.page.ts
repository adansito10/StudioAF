import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from 'src/app/services/AuthService';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss'],
    standalone: false,
})
export class Tab3Page implements OnInit {
    profileImage: string = 'assets/images/perfillll.jpg'; // Imagen por defecto
    isEditing: boolean = false;

    userData = {
        id: '',
        name: '',
        email: '',
        phone: '123-456-7890' // Teléfono estático
    };

    constructor(
        private authService: AuthService,
        private alertController: AlertController,
        private loadingController: LoadingController,
        private toastController: ToastController
    ) {}

    async ngOnInit() {
        await this.loadUserData();
    }

    async loadUserData() {
        try {
            this.userData.id = (await this.authService.getUserId()) || '';
            this.userData.name = (await this.authService.getUserName()) || 'Usuario';
            this.userData.email = (await this.authService.getUserEmail()) || 'correo@ejemplo.com';
            const storedImage = await this.authService.getProfilePicture();
            this.profileImage = storedImage || this.profileImage; // Usa la imagen almacenada o la por defecto
        } catch (error) {
            console.error('Error al cargar datos del usuario:', error);
            this.presentToast('Error al cargar datos del usuario', 'danger');
        }
    }

    async changeProfilePicture() {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.DataUrl,
                source: CameraSource.Photos,
            });

            if (image?.dataUrl) {
                this.profileImage = image.dataUrl;
            }
        } catch (error) {
            console.error('Error al seleccionar la imagen', error);
            this.presentToast('Error al seleccionar la imagen', 'danger');
        }
    }

    toggleEdit() {
        this.isEditing = !this.isEditing;
    }

    async saveChanges() {
        if (!this.userData.name || !this.userData.email) {
            this.presentToast('Por favor, completa todos los campos', 'warning');
            return;
        }

        const loading = await this.loadingController.create({
            message: 'Guardando cambios...',
        });
        await loading.present();

        try {
            const result = await this.authService.updateProfile(
                this.userData.id,
                this.userData.name,
                this.userData.email,
                this.profileImage
            ).toPromise();

            if (result.message === 'Usuario actualizado correctamente') {
                this.presentToast('Perfil actualizado exitosamente', 'success');
                this.isEditing = false;
            }
        } catch (error) {
            console.error('Error al guardar cambios:', error);
            const errorMessage = (error as Error).message || 'Error al guardar cambios';
            this.presentToast(errorMessage, 'danger');
        } finally {
            await loading.dismiss();
        }
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