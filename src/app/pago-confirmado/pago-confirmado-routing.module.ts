import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagoConfirmadoPage } from './pago-confirmado.page';

const routes: Routes = [
  {
    path: '',
    component: PagoConfirmadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagoConfirmadoPageRoutingModule {}
