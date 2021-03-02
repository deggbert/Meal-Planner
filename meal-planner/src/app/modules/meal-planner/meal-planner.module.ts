import { NgModule } from '@angular/core';

import { MealPlannerRoutingModule } from './meal-planner-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [ 
    HomeComponent,
  ],
  imports: [
    SharedModule, //?? seems overkill to have this meal-planner module that doesnt't do much and imports this shared module
    MealPlannerRoutingModule,
  ]
})
export class MealPlannerModule { }
