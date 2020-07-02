import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodDatabaseComponent } from './page/food-database.component';

const routes: Routes = [
  { 
    path: '', 
    component: FoodDatabaseComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodDatabaseRoutingModule { }
