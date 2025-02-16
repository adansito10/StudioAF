import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {
  servicios = [
    {
      titulo: 'Paquete de Bodas',
      descripcion: 'Descripción breve del servicio.',
      imagen: 'https://scontent.fjal3-1.fna.fbcdn.net/v/t39.30808-6/479667011_484967408004242_412642541140852009_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=FmzN7-H1zEoQ7kNvgHiRkrk&_nc_oc=AdiRABG3EJE3VwG0X-CXdROGvVRBC4j8PGLnb-GB2VE2Twisd-1CsyRr_zQo65GbPVXM7sHH3dz0BIMahA7MKB0S&_nc_zt=23&_nc_ht=scontent.fjal3-1.fna&_nc_gid=Aop-pIPjDghTFHWKP7RuamG&oh=00_AYBkDyW8b21IC_9oQkm5gvVm26ZfxT8OwuQO45r8XCC2yw&oe=67B70464'
    },
    {
      titulo: 'Servicio 2',
      descripcion: 'Descripción breve del servicio.',
      imagen: 'https://via.placeholder.com/300x150'
    },
    {
      titulo: 'Servicio 3',
      descripcion: 'Descripción breve del servicio.',
      imagen: 'https://via.placeholder.com/300x150'
    },
    {
      titulo: 'Servicio 4',
      descripcion: 'Descripción breve del servicio.',
      imagen: 'https://via.placeholder.com/300x150'
    },
    {
      titulo: 'Servicio 5',
      descripcion: 'Descripción breve del servicio.',
      imagen: 'https://via.placeholder.com/300x150'
    },
    {
      titulo: 'Servicio 6',
      descripcion: 'Descripción breve del servicio.',
      imagen: 'https://via.placeholder.com/300x150'
    }
  ];

  constructor() {}
}