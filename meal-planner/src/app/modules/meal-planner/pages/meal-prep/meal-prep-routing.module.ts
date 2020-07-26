import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealPrepComponent } from './page/meal-prep.component';

const routes: Routes = [{ path: '', component: MealPrepComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealPrepRoutingModule { }
