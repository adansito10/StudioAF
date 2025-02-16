import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {
  slides = [
    {
      title: 'STUDIO AF',
      description: '',
      image: 'https://images.unsplash.com/photo-1564754943164-e83c08469116?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmVydGljYWx8ZW58MHx8MHx8fDA%3D'
    },
    {
      title: 'Second Slide',
      description: '',
      image: 'https://images.unsplash.com/photo-1564754943164-e83c08469116?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmVydGljYWx8ZW58MHx8MHx8fDA%3D'
    },
    {
      title: 'Third Slide',
      description: '',
      image: 'https://images.unsplash.com/photo-1564754943164-e83c08469116?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmVydGljYWx8ZW58MHx8MHx8fDA%3D'
    }
  ];

  games = [
    {
      title: 'Bodas',
      cover: 'https://scontent.fjal3-1.fna.fbcdn.net/v/t39.30808-6/479792228_484967081337608_5056903086944532449_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=-7FaL97ppf8Q7kNvgFL036y&_nc_oc=AdjFhmDkyQSYTBFjK56nEvVsxpS2Lam5frOQ-jgYqxjrnNao-Yuw0YEkr_V8vt1VM0MvRhQL5F_CIfNLnAa6Dh1U&_nc_zt=23&_nc_ht=scontent.fjal3-1.fna&_nc_gid=AJ_FMtAysURIkgII6OCo_Qe&oh=00_AYCiplhi5rNUUDas1FUOGKyfFohBJFnlYwQRfVwAw96xdg&oe=67B6ECA4',
      gallery: [
        'https://via.placeholder.com/600x400?text=Game1-1',
        'https://via.placeholder.com/600x400?text=Game1-2',
        'https://via.placeholder.com/600x400?text=Game1-3'
      ]
    },
    {
      title: 'XV AÑOS',
      cover: 'https://scontent.fjal3-1.fna.fbcdn.net/v/t39.30808-6/475505286_475412352293081_8404268094152390329_n.jpg?stp=c0.225.1365.1365a_dst-jpg_s206x206_tt6&_nc_cat=101&ccb=1-7&_nc_sid=714c7a&_nc_ohc=DU52NrLG7XsQ7kNvgFFfHlX&_nc_oc=AdjXtNUGwoFsqnsIPaRX-HiNSq2JWmRpsqj5bNZMu4JZ-V1fYAe_iHMfEwczl0sDmlIq4VYagyf8iiTjBOXCjzmU&_nc_zt=23&_nc_ht=scontent.fjal3-1.fna&_nc_gid=AEzc1ydop3hMCgSFJvWedDa&oh=00_AYABs_b3abBV1wuFmWzZCbkJ3LSKFtDWKbAiO9W-WwCw3A&oe=67B710B0',
      gallery: [
        'https://scontent.fjal3-1.fna.fbcdn.net/v/t39.30808-6/475423300_475412162293100_5519711910065159403_n.jpg?stp=c342.0.1365.1365a_dst-jpg_s206x206_tt6&_nc_cat=105&ccb=1-7&_nc_sid=714c7a&_nc_ohc=ImOgVaEF-R8Q7kNvgGCwZbJ&_nc_oc=Adh3GWyh7IHFMjXM6jp4waSafEg7DJF2RGGNWZkavpnZ_DX-CgUiJhyrK9eUsi8V3RkV7l_0NnEKrO4ZPC2_X1Gn&_nc_zt=23&_nc_ht=scontent.fjal3-1.fna&_nc_gid=AEzc1ydop3hMCgSFJvWedDa&oh=00_AYA6qy1_sl6lX2W2AMf9FsWcyu5u3kpVYIvAh5wGatErrg&oe=67B6F5C0',
        'https://scontent.fjal3-1.fna.fbcdn.net/v/t39.30808-6/465910610_416290181538632_8309940239094145703_n.jpg?stp=c0.225.1366.1366a_dst-jpg_s206x206_tt6&_nc_cat=111&ccb=1-7&_nc_sid=714c7a&_nc_ohc=U9xntHqPvVAQ7kNvgH11PF7&_nc_oc=AdgxAUOXgNJ97nje8j75euJEvU-DHwQFIsnIWVOBd4qS2Wb485EDZrzTmWzffsJMKkMWtfnfyy-8EHz-tffrDrW4&_nc_zt=23&_nc_ht=scontent.fjal3-1.fna&_nc_gid=Apf2RmgDVPcymAqGAI_ILQc&oh=00_AYBi4J3xf4e5HgJX7n_BtJCYhaX-SS5srXAdj3V8wLGcmQ&oe=67B71A25',
        'https://scontent.fjal3-1.fna.fbcdn.net/v/t39.30808-6/465066620_412548618579455_3808387230067143867_n.jpg?stp=c341.0.1366.1366a_dst-jpg_s206x206_tt6&_nc_cat=107&ccb=1-7&_nc_sid=714c7a&_nc_ohc=xGNhtNN8Hu8Q7kNvgFHvzD6&_nc_oc=AdiINfHZW4aJwsRjPQj160sOp4FK86ZsL1aedsyx0ZTFUAW-8606q0SitPFCuHTuvdN2HZxWoR10y0QPcB9RkQ9E&_nc_zt=23&_nc_ht=scontent.fjal3-1.fna&_nc_gid=A6BYH0BfvOcyA09fHnrjp26&oh=00_AYACIzd1V_z2PliaNEDXh2yoSGoFm4-pwLEentjQeHdXbw&oe=67B710B1'
      ]
    },
    {
      title: 'Game 3',
      cover: 'https://images.unsplash.com/photo-1564754943164-e83c08469116?w=1000&auto=format&fit=crop&q=60',
      gallery: [
        'https://via.placeholder.com/600x400?text=Game3-1',
        'https://via.placeholder.com/600x400?text=Game3-2',
        'https://via.placeholder.com/600x400?text=Game3-3'
      ]
    }
  ];

  constructor(private navCtrl: NavController) {}

  openGallery(game: any) {
    this.navCtrl.navigateForward(['/gallery', { images: JSON.stringify(game.gallery), title: game.title }]);
  }

}