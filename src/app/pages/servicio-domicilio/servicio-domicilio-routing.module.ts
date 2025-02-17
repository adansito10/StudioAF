import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicioDomicilioPage } from './servicio-domicilio.page';

const routes: Routes = [
  {
    path: '',
    component: ServicioDomicilioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicioDomicilioPageRoutingModule {}
