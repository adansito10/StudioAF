import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login', 
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }, 
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'detalle-servicio',
    loadChildren: () => import('./pages/detalle-servicio/detalle-servicio.module').then(m => m.DetalleServicioPageModule)
  },
  {
    path: 'pago',
    loadChildren: () => import('./pages/pago/pago.module').then(m => m.PagoPageModule)
  },
  {
    path: 'formulario',
    loadChildren: () => import('./pages/formulario/formulario.module').then(m => m.FormularioPageModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('./pages/gallery/gallery.module').then(m => m.GalleryPageModule)
  },
  {
    path: 'servicio-domicilio',
    loadChildren: () => import('./pages/servicio-domicilio/servicio-domicilio.module').then(m => m.ServicioDomicilioPageModule)
  },
  {
    path: 'metodo-pago',
    loadChildren: () => import('./pages/metodo-pago/metodo-pago.module').then(m => m.MetodoPagoPageModule)
  },
  {
    path: 'pago-confirmado',
    loadChildren: () => import('./pago-confirmado/pago-confirmado.module').then(m => m.PagoConfirmadoPageModule)
  },
  {
    path: 'consultas',
    loadChildren: () => import('./consultas/consultas.module').then(m => m.ConsultasPageModule)
  },
  {
    path: 'nueva-pagina',
    loadChildren: () => import('./nueva-pagina/nueva-pagina.module').then(m => m.NuevaPaginaPageModule)
  },
  {
    path: 'resumen-servicio',
    loadChildren: () => import('./resumen-servicio/resumen-servicio.module').then(m => m.ResumenServicioPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
