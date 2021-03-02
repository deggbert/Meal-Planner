import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

import { DailyMealPlanRoutingModule } from './daily-meal-plan-routing.module';
import { DailyMealPlanComponent } from './page/daily-meal-plan.page';

import { DailyMacrosComponent } from './components/daily-macros/daily-macros.component';
import { DailyMealPlanTableComponent } from './components/daily-meal-plan-table/daily-meal-plan-table.component';

@NgModule({
  declarations: [
    DailyMealPlanComponent,
    DailyMacrosComponent,
    DailyMealPlanTableComponent
  ],
  imports: [
    SharedModule,
    DailyMealPlanRoutingModule
  ]
})
export class DailyMealPlanModule { }
