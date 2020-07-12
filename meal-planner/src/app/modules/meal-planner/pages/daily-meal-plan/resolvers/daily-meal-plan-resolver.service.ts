import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { Observable } from 'rxjs';

import { DailyMealPlanService } from 'src/app/core/services/daily-meal-plan.service';

import { DailyMealPlan } from 'src/app/shared/interfaces/daily-meal-plan.interface';

@Injectable({
  providedIn: 'root'
})
export class DailyMealPlanResolverService implements Resolve<DailyMealPlan> {

  constructor(
    private router: Router,
    private dailyMealPlanService: DailyMealPlanService,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DailyMealPlan> {
    return this.dailyMealPlanService.getDailyMealPlan(); 
  }
}


