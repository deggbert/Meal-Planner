import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodInputComponent } from './food-input/food-input.component';
import { FoodDatabaseComponent } from './food-database/food-database.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { DailyMealPlanComponent } from './daily-meal-plan/daily-meal-plan.component';
import { MealPrepComponent } from './meal-prep/meal-prep.component';
import { FoodStockComponent } from './food-stock/food-stock.component';
import { GroceryTripComponent } from './grocery-trip/grocery-trip.component';
import { FoodEditComponent } from './food-edit/food-edit.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'userInfo', component: UserInfoComponent },
  { path: 'dailyMealPlan', component: DailyMealPlanComponent },
  { path: 'foodStock', component: FoodStockComponent },
  { path: 'groceryTrip', component: GroceryTripComponent },
  { path: 'mealPrep', component: MealPrepComponent },
  { path: 'foodInput', component: FoodInputComponent },
  { path: 'foodEdit', component: FoodEditComponent},
  { path: 'foodDatabase', component: FoodDatabaseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
