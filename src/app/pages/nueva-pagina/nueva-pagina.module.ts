import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaPaginaPageRoutingModule } from './nueva-pagina-routing.module';

import { NuevaPaginaPage } from './nueva-pagina.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaPaginaPageRoutingModule
  ],
  declarations: [NuevaPaginaPage]
})
export class NuevaPaginaPageModule {}
