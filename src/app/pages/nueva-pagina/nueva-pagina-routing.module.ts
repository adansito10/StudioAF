import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevaPaginaPage } from './nueva-pagina.page';

const routes: Routes = [
  {
    path: '',
    component: NuevaPaginaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevaPaginaPageRoutingModule {}
