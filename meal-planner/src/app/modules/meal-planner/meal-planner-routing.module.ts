import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { UserInfoResolverService } from './pages/user-info/resolver/user-info-resolver.service';

import { HomeComponent } from './pages/home/home.component';
import { DailyMealPlanComponent } from './pages/daily-meal-plan/daily-meal-plan.component';
import { FoodStockComponent } from './pages/food-stock/food-stock.component';
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
    component: DailyMealPlanComponent, 
    canActivate: [AuthGuard]
  },
  { 
    path: 'food-stock', 
    component: FoodStockComponent, 
    canActivate: [AuthGuard]
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
