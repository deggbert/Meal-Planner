import { NgModule } from '@angular/core';

import { MealPlannerRoutingModule } from './meal-planner-routing.module';
import { SharedModule } from './shared-module/shared.module';

import { HomeComponent } from './pages/home/home.component';
import { MealPrepComponent } from './pages/meal-prep/meal-prep.component';

import { GroceryTripComponent } from './shared-components/grocery-trip/grocery-trip.component';

@NgModule({
  declarations: [ 
    HomeComponent,
    MealPrepComponent,

    GroceryTripComponent,
  ],
  imports: [
    SharedModule, //?? seems overkill to have this meal-planner module that doesnt't do much and imports this shared module
    MealPlannerRoutingModule,
  ]
})
export class MealPlannerModule { }
