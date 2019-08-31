import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'route', loadChildren: './feature/order/order.module#OrderModule'},
    { path: '', redirectTo: 'route', pathMatch: 'full' },
    { path: '**', redirectTo: 'route', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
