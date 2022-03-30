import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroPage } from './registro.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroPage
  },
  {
    path: 'codigo-seguridad',
    loadChildren: () => import('./codigo-seguridad/codigo-seguridad.module').then( m => m.CodigoSeguridadPageModule)
  },  {
    path: 'finalizar',
    loadChildren: () => import('./finalizar/finalizar.module').then( m => m.FinalizarPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroPageRoutingModule {}
