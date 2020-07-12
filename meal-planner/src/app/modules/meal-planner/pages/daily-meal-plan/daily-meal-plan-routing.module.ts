import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyMealPlanComponent } from './page/daily-meal-plan.component';

const routes: Routes = [
  { 
    path: '', 
    component: DailyMealPlanComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyMealPlanRoutingModule { }
