import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ImageModalComponent } from '../../components/image-modal/image-modal.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: false
})
export class GalleryPage implements OnInit {
  images: string[] = [];
  title: string = '';

  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    const imagesParam = this.route.snapshot.paramMap.get('images');
    this.title = this.route.snapshot.paramMap.get('title') || 'Galería';

    if (imagesParam) {
      this.images = JSON.parse(imagesParam);
    }
  }

  async openImage(image: string) {
    const initialIndex = this.images.indexOf(image); // Índice de la imagen seleccionada
    const modal = await this.modalCtrl.create({
      component: ImageModalComponent,
      componentProps: {
        images: this.images, // Pasamos todas las imágenes
        initialIndex: initialIndex // Índice inicial
      }
    });
    await modal.present();
  }

  goBack() {
    this.navCtrl.navigateBack('/tabs/menu');
  }
}