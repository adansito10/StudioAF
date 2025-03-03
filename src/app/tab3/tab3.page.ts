import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {
  profileImage: string = 'assets/images/xd.jpeg'; // Imagen de perfil por defecto
  isEditing: boolean = false; // Controla el modo edición

  // Datos del usuario
  userData = {
    name: 'Adan JC',
    email: 'adandejesus20324gmail.com',
    phone: '+52 271 291 70 11'
  };

  constructor() {}

  // Método para cambiar la foto de perfil
  async changeProfilePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos, // Abre la galería
      });

      if (image?.dataUrl) {
        this.profileImage = image.dataUrl; // Cambia la imagen en la vista
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen', error);
    }
  }

  // Activar o desactivar modo edición
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  // Guardar los cambios
  saveChanges() {
    this.isEditing = false; // Salir del modo edición
    console.log('Datos guardados:', this.userData);
  }
}
