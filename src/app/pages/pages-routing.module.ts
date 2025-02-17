import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    component: PagesPage
  },  {
    path: 'servicio-domicilio',
    loadChildren: () => import('./servicio-domicilio/servicio-domicilio.module').then( m => m.ServicioDomicilioPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
