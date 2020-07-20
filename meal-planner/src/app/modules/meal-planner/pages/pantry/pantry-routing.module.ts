import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PantryComponent } from './page/pantry.component';

const routes: Routes = [
  { 
    path: '', 
  component: PantryComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PantryRoutingModule { }
