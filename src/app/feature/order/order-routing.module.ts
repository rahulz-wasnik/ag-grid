import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderGridContainerComponent } from './order-grid/order-gird-container.component';

const routes: Routes = [
  { path: '', component: OrderGridContainerComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
