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
      descripcion: 'Recuerda el mejor dia de tu vida con nuestras fotos',
      imagen: 'https://scontent.fjal3-1.fna.fbcdn.net/v/t39.30808-6/479667011_484967408004242_412642541140852009_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=FmzN7-H1zEoQ7kNvgHiRkrk&_nc_oc=AdiRABG3EJE3VwG0X-CXdROGvVRBC4j8PGLnb-GB2VE2Twisd-1CsyRr_zQo65GbPVXM7sHH3dz0BIMahA7MKB0S&_nc_zt=23&_nc_ht=scontent.fjal3-1.fna&_nc_gid=Aop-pIPjDghTFHWKP7RuamG&oh=00_AYBkDyW8b21IC_9oQkm5gvVm26ZfxT8OwuQO45r8XCC2yw&oe=67B70464'
    },
    {
      titulo: 'Paquete de BabyShower',
      descripcion: 'celebra tu babyShower con nuestras fotos',
      imagen: 'https://scontent.fjal3-1.fna.fbcdn.net/v/t39.30808-6/464387054_406880092479641_5584701324470907316_n.jpg?stp=c0.225.1366.1366a_dst-jpg_s640x640_tt6&_nc_cat=109&ccb=1-7&_nc_sid=714c7a&_nc_ohc=0y9V3aWPb_4Q7kNvgFH98IG&_nc_oc=AdgvEsCjFaNYIB9pmIkXcdkZuJxTebdeAM0b0qdVzZJz77UdBKWHnNtbtilL8lHAndhQFw56k94L3m5LaKqo1Uyw&_nc_zt=23&_nc_ht=scontent.fjal3-1.fna&_nc_gid=A-K3be6MQqhsWO-0KJK_pSb&oh=00_AYC0fa31xWUlN0AivXL2iKhnmh6p5U5qLLYGBob6tHhnnw&oe=67B82180'
    },
    {
      titulo: 'Paquete de Bautizo',
      descripcion: 'Recuerda el bautizo de tu hijo con nuestras fotos',
      imagen: 'https://scontent.fjal3-1.fna.fbcdn.net/v/t39.30808-6/421592922_231687776665541_3162595443811119658_n.jpg?stp=c341.0.1366.1366a_dst-jpg_s640x640_tt6&_nc_cat=110&ccb=1-7&_nc_sid=714c7a&_nc_ohc=MNPajrXNLowQ7kNvgEE6fMV&_nc_oc=Adg0WRfuRcxKyD8lW0gWMJmEB0Wu4kLXtJOJBH7Wt_ncg-0LfaJakpmWP0JUTNUJ_lv513zQGmJspyS7gjMl4Nql&_nc_zt=23&_nc_ht=scontent.fjal3-1.fna&_nc_gid=AGAp2Qg1C5xPGhcR23k8-qO&oh=00_AYAx-T46ftW-FHzoanyGmZx2bx5sEKIZRj04Umt9tc_U5w&oe=67B803F6'
    },
    {
      titulo: 'Paquete XV años',
      descripcion: 'Disfruta lo mejro de tus quinceaños con nuestras fotos',
      imagen: 'https://scontent.fjal3-1.fna.fbcdn.net/v/t39.30808-6/474763912_475413062293010_4596424278282579232_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=6M5ooDavADIQ7kNvgGrTnH2&_nc_oc=AdhRw7qCFc-E8A-J224ambsThoFhgoViQo6wemfx9k7boLcizoI_-CWx1GVegmcZnHBgZACmXEcdJ3mtaFBci4UA&_nc_zt=23&_nc_ht=scontent.fjal3-1.fna&_nc_gid=A8bE1xIWpVHymD70IAu5F_8&oh=00_AYA3mEuNvZurOFnfJSSvV1jldAAO2Ub7qGDdAYuwtM424A&oe=67B8216C'
    },
    {
      titulo: 'Paquete Familiar',
      descripcion: 'Marca los momentos de familiar con nuestra fotos',
      imagen: 'https://scontent.fjal3-1.fna.fbcdn.net/v/t39.30808-6/426149581_238469392654046_8954570278211470201_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s640x640_tt6&_nc_cat=101&ccb=1-7&_nc_sid=714c7a&_nc_ohc=5ZrA2oNUVYgQ7kNvgFTjXzt&_nc_oc=AdjOAfHuqspL1daI1BHHoSM9T8B1I7tjATwl5x-RxD_12m1Dh4rrDqxfhIKlt-lKb4jOgjyuN-EEKgZEhifhaIhX&_nc_zt=23&_nc_ht=scontent.fjal3-1.fna&_nc_gid=AGi8k_O4vNBWt_pfOr6f9s8&oh=00_AYCXu3d8p1PsFHHgMyztShyxwPGVmLnGmgKwg5S9uf9ZGg&oe=67B82B1E'
    },
    {
      titulo: 'Paquete aesthetic',
      descripcion: 'Toma tus mejores poses con nuestras fotos',
      imagen: 'https://scontent.fjal3-1.fna.fbcdn.net/v/t39.30808-6/395206629_175272952307024_7939352240849571079_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=Nlm7ehFqrccQ7kNvgG-2VZl&_nc_oc=Adg02GJ2N2_UhkyCEOsxfoZUfXLJkIrJJ9tK-5Q8MJ6onoFEujsfxsfbMXjI8Y1sWyGpzNhoqJfznRhQOXQwFIYk&_nc_zt=23&_nc_ht=scontent.fjal3-1.fna&_nc_gid=AJb9uR5RCUpSddiiktCtHRz&oh=00_AYAiACcQUmNYxTK3Xkd-KHrJWHrxdc-1vopHsxJHziKoSw&oe=67B818EB'
    }
  ];

  constructor() {}
}