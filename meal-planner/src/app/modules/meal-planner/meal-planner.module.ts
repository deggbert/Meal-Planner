import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MealPlannerRoutingModule } from './meal-planner-routing.module';

import { HomeComponent } from './pages/home/home.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { FoodDatabaseComponent } from './pages/food-database/food-database.component';
import { DailyMealPlanComponent } from './pages/daily-meal-plan/daily-meal-plan.component';
import { FoodStockComponent } from './pages/food-stock/food-stock.component';
import { MealPrepComponent } from './pages/meal-prep/meal-prep.component';
import { FoodInputComponent } from './components/food-input/food-input.component';
import { FoodSearchComponent } from './components/food-search/food-search.component';
import { GroceryTripComponent } from './components/grocery-trip/grocery-trip.component';
import { FoodTableComponent } from './components/food-table/food-table.component';


@NgModule({
  declarations: [ 
    HomeComponent,
    UserInfoComponent, 
    FoodDatabaseComponent,
    DailyMealPlanComponent,
    FoodStockComponent,
    MealPrepComponent,

    FoodInputComponent,
    FoodSearchComponent,
    GroceryTripComponent,
    FoodTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MealPlannerRoutingModule
  ]
})
export class MealPlannerModule { }
