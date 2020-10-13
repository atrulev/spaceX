import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShipDetailsComponent } from './ship-details/ship-details.component';
import { ShipsComponent } from './ships/ships.component';

const routes: Routes = [
  {path: '', component: ShipsComponent},
  {path: ':name', component: ShipDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
