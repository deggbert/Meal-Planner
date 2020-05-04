import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodInputComponent } from './food-input/food-input.component';
import { FoodDatabaseComponent } from './food-database/food-database.component';


const routes: Routes = [
  { path: '', redirectTo: '/foodInpt', pathMatch: 'full' },
  { path: 'foodInput', component: FoodInputComponent },
  { path: 'foodDatabase', component: FoodDatabaseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
