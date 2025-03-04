import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResumenServicioPageRoutingModule } from './resumen-servicio-routing.module';

import { ResumenServicioPage } from './resumen-servicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResumenServicioPageRoutingModule
  ],
  declarations: [ResumenServicioPage]
})
export class ResumenServicioPageModule {}
