import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './modules/login/pages/login/login.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'meal-planner', 
    loadChildren: () => import('./modules/meal-planner/meal-planner.module').then(m => m.MealPlannerModule) },
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' },
  { 
    path: '**', 
    component: LoginComponent 
  } //TODO: change to 404 page not found page
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
