import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagoConfirmadoPageRoutingModule } from './pago-confirmado-routing.module';

import { PagoConfirmadoPage } from './pago-confirmado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagoConfirmadoPageRoutingModule
  ],
  declarations: [PagoConfirmadoPage]
})
export class PagoConfirmadoPageModule {}
