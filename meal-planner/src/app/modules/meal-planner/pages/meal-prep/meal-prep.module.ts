import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

import { MealPrepRoutingModule } from './meal-prep-routing.module';
import { MealPrepComponent } from './page/meal-prep.page';
import { MealPrepTableComponent } from './components/meal-prep-table/meal-prep-table.component';


@NgModule({
  declarations: [
    MealPrepComponent,
    MealPrepTableComponent,
  ],
  imports: [
    SharedModule,
    MealPrepRoutingModule
  ]
})
export class MealPrepModule { }
