import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/core/guards/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { FoodDatabaseComponent } from './pages/food-database/food-database.component';
import { DailyMealPlanComponent } from './pages/daily-meal-plan/daily-meal-plan.component';
import { FoodStockComponent } from './pages/food-stock/food-stock.component';
import { MealPrepComponent } from './pages/meal-prep/meal-prep.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'user-info', component: UserInfoComponent, canActivate: [AuthGuard]},
  { path: 'food-database', component: FoodDatabaseComponent, canActivate: [AuthGuard]},
  { path: 'daily-meal-plan', component: DailyMealPlanComponent, canActivate: [AuthGuard]},
  { path: 'food-stock', component: FoodStockComponent, canActivate: [AuthGuard]},
  { path: 'meal-prep', component: MealPrepComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealPlannerRoutingModule { }
