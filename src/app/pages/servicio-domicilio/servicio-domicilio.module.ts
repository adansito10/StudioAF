import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicioDomicilioPageRoutingModule } from './servicio-domicilio-routing.module';

import { ServicioDomicilioPage } from './servicio-domicilio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicioDomicilioPageRoutingModule
  ],
  declarations: [ServicioDomicilioPage]
})
export class ServicioDomicilioPageModule {}
