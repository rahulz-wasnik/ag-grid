import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderGridComponent } from './order-grid/order-grid.component';

const routes: Routes = [
  { path: '', component: OrderGridComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
