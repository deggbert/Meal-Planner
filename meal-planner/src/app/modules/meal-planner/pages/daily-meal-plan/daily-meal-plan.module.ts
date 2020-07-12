import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared-module/shared.module';

import { DailyMealPlanRoutingModule } from './daily-meal-plan-routing.module';
import { DailyMealPlanComponent } from './page/daily-meal-plan.component';
import { DailyMacrosComponent } from './componenets/daily-macros/daily-macros.component';


@NgModule({
  declarations: [
    DailyMealPlanComponent,
    DailyMacrosComponent
  ],
  imports: [
    SharedModule,
    DailyMealPlanRoutingModule
  ]
})
export class DailyMealPlanModule { }
