import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  servicios: any[] = [
    {
      titulo: 'Paquete de Bodas',
      descripcion: 'Sesión fotográfica profesional con entrega de 50 fotos de alta calidad.',
      imagen: 'https://scontent.fjal3-1.fna.fbcdn.net/v/t39.30808-6/479667011_484967408004242_412642541140852009_n.jpg?stp=c0.225.1365.1365a_dst-jpg_s640x640_tt6&_nc_cat=107&ccb=1-7&_nc_sid=714c7a&_nc_ohc=FmzN7-H1zEoQ7kNvgGQ0gpz&_nc_oc=Adhetu3DJvCRERGd3nynan9iK367Q38CYO5wjPnzM4Vm3uqIjX6n34EVbqRNS6Mp85OjBYLzAvOkaFh2uihsD32y&_nc_zt=23&_nc_ht=scontent.fjal3-1.fna&_nc_gid=ARLAVD8K8IWN1lLC67Rlx1y&oh=00_AYCbIUr41YfPVHf6hEzwh_ORS9VeJADj3KmXii2dF5VxiA&oe=67B81DA4',
      video: 'assets/videos/paquete-bodas.mp4' 
    },
    {
      titulo: 'Paquete de XV Años',
      descripcion: 'Incluye sesión fotográfica con cambio de vestuario y 40 fotos editadas.',
      imagen: 'https://scontent.fjal3-1.fna.fbcdn.net/v/t39.30808-6/474553716_475412998959683_6997502524315856307_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s640x640_tt6&_nc_cat=110&ccb=1-7&_nc_sid=714c7a&_nc_ohc=ytcYR4-udK4Q7kNvgGtApax&_nc_oc=Adh1wzZRm17b10I_uPo57avwjllKpyR8ROcpM9A0IB4MQAELzMF6-SNzpjyHYhq7hV-jcNxDTdZ6fFbLucLKDOg2&_nc_zt=23&_nc_ht=scontent.fjal3-1.fna&_nc_gid=AJMFGBeE9V8QmBcjVfVqwKc&oh=00_AYAIxZ0T1XldPmWg9xAGYoXEBNiCKvbpQF-Aeiod5oyz7Q&oe=67B8045A',
      video: 'assets/videos/paquete-xv.mp4' // URL del video
    },
    {
      titulo: 'Paquete BabyShower',
      descripcion: 'Fotografías temáticas para niños con mini álbum impreso.',
      imagen: 'https://scontent.fjal3-1.fna.fbcdn.net/v/t39.30808-6/464387054_406880092479641_5584701324470907316_n.jpg?stp=c0.225.1366.1366a_dst-jpg_s640x640_tt6&_nc_cat=109&ccb=1-7&_nc_sid=714c7a&_nc_ohc=0y9V3aWPb_4Q7kNvgFH98IG&_nc_oc=AdgvEsCjFaNYIB9pmIkXcdkZuJxTebdeAM0b0qdVzZJz77UdBKWHnNtbtilL8lHAndhQFw56k94L3m5LaKqo1Uyw&_nc_zt=23&_nc_ht=scontent.fjal3-1.fna&_nc_gid=A-K3be6MQqhsWO-0KJK_pSb&oh=00_AYC0fa31xWUlN0AivXL2iKhnmh6p5U5qLLYGBob6tHhnnw&oe=67B82180',
      video: 'assets/videos/paquete-infantil.mp4' // URL del video
    },
    {
      titulo: 'Paquete Familiar',
      descripcion: 'Fotografías temáticas para niños con mini álbum impreso.',
      imagen: 'https://scontent.fjal3-1.fna.fbcdn.net/v/t39.30808-6/426149581_238469392654046_8954570278211470201_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s640x640_tt6&_nc_cat=101&ccb=1-7&_nc_sid=714c7a&_nc_ohc=5ZrA2oNUVYgQ7kNvgFTjXzt&_nc_oc=AdjOAfHuqspL1daI1BHHoSM9T8B1I7tjATwl5x-RxD_12m1Dh4rrDqxfhIKlt-lKb4jOgjyuN-EEKgZEhifhaIhX&_nc_zt=23&_nc_ht=scontent.fjal3-1.fna&_nc_gid=AGi8k_O4vNBWt_pfOr6f9s8&oh=00_AYCXu3d8p1PsFHHgMyztShyxwPGVmLnGmgKwg5S9uf9ZGg&oe=67B82B1E',
      video: 'assets/videos/paquete-infantil.mp4' // URL del video
    },
    {
      titulo: 'Paquete Bautizo',
      descripcion: 'Fotografías temáticas para niños con mini álbum impreso.',
      imagen: 'https://scontent.fjal3-1.fna.fbcdn.net/v/t39.30808-6/422944713_231687416665577_6273280992774702494_n.jpg?stp=c376.0.1296.1296a_dst-jpg_s640x640_tt6&_nc_cat=104&ccb=1-7&_nc_sid=714c7a&_nc_ohc=3OF4CtQHk2IQ7kNvgGb7b7f&_nc_oc=AdhiPrkh-YzJ1CQdEHCIPmezXccCIijdz5nV8aoB_sOs3YiioFkvv5pzLEoDqba0G6q869trBaTo1XPPne-rxr3Y&_nc_zt=23&_nc_ht=scontent.fjal3-1.fna&_nc_gid=AGAp2Qg1C5xPGhcR23k8-qO&oh=00_AYDkU07B4juWQ1Vl23eZfzMUDRrQfVDb553mXko6qVoYpw&oe=67B80DEC',
      video: 'assets/videos/paquete-infantil.mp4' // URL del video
    }
  ];

  constructor() { }

  ngOnInit() {}
}