import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ImageModalComponent } from '../../components/image-modal/image-modal.component';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone:false
})
export class GalleryPage implements OnInit {

 images: string[] = [];
title: string = '';

constructor(private route: ActivatedRoute, private modalCtrl: ModalController) {}

ngOnInit() {
  const imagesParam = this.route.snapshot.paramMap.get('images');
  this.title = this.route.snapshot.paramMap.get('title') || 'Galería';
  
  if (imagesParam) {
    this.images = JSON.parse(imagesParam);
  }
}

async openImage(image: string) {
  const modal = await this.modalCtrl.create({
    component: ImageModalComponent,
    componentProps: { image }
  });
  await modal.present();
}
}
