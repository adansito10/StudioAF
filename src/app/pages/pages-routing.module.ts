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
  },
  {
    path: 'metodo-pago',
    loadChildren: () => import('./metodo-pago/metodo-pago.module').then( m => m.MetodoPagoPageModule)
  },
  {
    path: 'nueva-pagina',
    loadChildren: () => import('./nueva-pagina/nueva-pagina.module').then( m => m.NuevaPaginaPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
