import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { UserInfoResolverService } from './pages/user-info/resolver/user-info-resolver.service';
import { DailyMealPlanResolverService } from './pages/daily-meal-plan/resolvers/daily-meal-plan-resolver.service';
import { FoodListResolverService } from './pages/daily-meal-plan/resolvers/food-list-resolver.service';

import { HomeComponent } from './pages/home/home.component';
import { MealPrepComponent } from './pages/meal-prep/meal-prep.component';

const routes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent, 
    canActivate: [AuthGuard]
  },
  { 
    path: 'user-info', 
    loadChildren: () => import('./pages/user-info/user-info.module').then(m => m.UserInfoModule),
    canActivate: [AuthGuard], 
    resolve: {
      userInfo: UserInfoResolverService
    }
  },
  { 
    path: 'food-database', 
    loadChildren: () => import('./pages/food-database/food-database.module').then(m => m.FoodDatabaseModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'daily-meal-plan', 
    loadChildren: () => import('./pages/daily-meal-plan/daily-meal-plan.module').then(m => m.DailyMealPlanModule),
    canActivate: [AuthGuard],
    resolve: {
      dailyMealPlan: DailyMealPlanResolverService,
      foodList: FoodListResolverService,
      userInfo: UserInfoResolverService,
    }
  },
  { 
    path: 'pantry', 
    loadChildren: () => import('./pages/pantry/pantry.module').then(m => m.PantryModule),
    canActivate: [AuthGuard],
    resolve: {
      dailyMealPlan: DailyMealPlanResolverService,
      foodList: FoodListResolverService,
    }
  },
  { 
    path: 'meal-prep', 
    component: MealPrepComponent, 
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealPlannerRoutingModule { }
