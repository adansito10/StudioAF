import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumenServicioPage } from './resumen-servicio.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenServicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumenServicioPageRoutingModule {}
