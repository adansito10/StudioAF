import { Component, Input, AfterViewInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Swiper from 'swiper'; // Importamos Swiper
import { Navigation, Pagination, Zoom } from 'swiper/modules'; // Importamos módulos necesarios

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
  standalone: false
})
export class ImageModalComponent implements AfterViewInit {
  @Input() images: string[] = []; // Array de imágenes
  @Input() initialIndex: number = 0; // Índice inicial

  swiper: Swiper | undefined;

  constructor(private modalCtrl: ModalController) {}

  ngAfterViewInit() {
    // Inicializamos Swiper después de que el DOM esté listo
    this.swiper = new Swiper('.swiper-container', {
      modules: [Navigation, Pagination, Zoom], // Módulos necesarios
      initialSlide: this.initialIndex,
      speed: 400,
      loop: true, // Opcional: para un carrusel cíclico
      zoom: {
        maxRatio: 3 // Permite zoom hasta 3x
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}