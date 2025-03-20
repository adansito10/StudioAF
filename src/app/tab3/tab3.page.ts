import { Component, OnInit } from '@angular/core'; // Añadimos OnInit
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from 'src/app/services/AuthService'; // Importamos AuthService

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit { // Implementamos OnInit
  profileImage: string = 'assets/images/perfillll.jpg';
  isEditing: boolean = false;

  userData = {
    name: '',
    email: '',
    phone: '' // Dejamos el teléfono estático
  };

  constructor(private authService: AuthService) {} // Inyectamos AuthService

  async ngOnInit() {
    // Obtenemos el nombre y el correo del usuario desde AuthService
    this.userData.name = (await this.authService.getUserName()) || 'Usuario';
    this.userData.email = (await this.authService.getUserEmail()) || 'correo@ejemplo.com';
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
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    this.isEditing = false;
    console.log('Datos guardados:', this.userData);
  }
}