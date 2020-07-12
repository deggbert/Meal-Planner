import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { MessageService } from './message.service';

import { DailyMealPlan, Meal } from 'src/app/shared/interfaces/daily-meal-plan.interface';
import { Food } from 'src/app/shared/interfaces/food.interface';

@Injectable({
  providedIn: 'root'
})
export class DailyMealPlanService {

  constructor(
    private authService: AuthService,
    private afStore: AngularFirestore,
    private messageService: MessageService,
  ) { }

  getDailyMealPlan(): Observable<DailyMealPlan> {
    return this.afStore.collection('dailyMealPlan').doc(this.authService.uid).get().pipe(
      map((dailyMealPlan) => {
        if (!dailyMealPlan.exists) {
          return this.initializeDailyMealPlan();
        } else {
          return dailyMealPlan.data() as DailyMealPlan;
        }
      }),
      tap((_) => this.log('fetched dailyMealPlan')),
      catchError(err => {
        console.log(err);
        throw err;
      })
    );
  }

  initializeDailyMealPlan() {
    const dailyMealPlan: DailyMealPlan = {
      breakfast: [],
      lunch: [],
      dinner: [],
    };
    this.afStore.collection('dailyMealPlan').doc(this.authService.uid).set(dailyMealPlan);
    return dailyMealPlan;
  }

  async updateDailyMealPlan(breakfast: Food[], lunch: Food[], dinner: Food[]): Promise<void> {
    try {
      const breakfastData = breakfast.map((item, index) => {
        if (!item.servingsPerMeal) item.servingsPerMeal = 0;

        return {
          docId: item.docId,
          num: index,
          servings: item.servingsPerMeal,
          mealplan: true,
        }
      });
  
      const lunchData = lunch.map((item, index) => {
        if (!item.servingsPerMeal) item.servingsPerMeal = 0;

        return {
          docId: item.docId,
          num: index,
          servings: item.servingsPerMeal,
          mealplan: true,
        }
      });
  
      const dinnerData = dinner.map((item, index) => {
        if (!item.servingsPerMeal) item.servingsPerMeal = 0;

        return {
          docId: item.docId,
          num: index,
          servings: item.servingsPerMeal,
          mealplan: true,
        }
      });
  
      let dailyMealPlan = {
        breakfast: breakfastData,
        lunch: lunchData,
        dinner: dinnerData,
      };
      
      this.log('updated Daily Meal Plan **NOT YET SAVED TO SERVER**')
  
      this.afStore.collection('dailyMealPlan').doc(this.authService.uid).set(dailyMealPlan, { merge: false });
  
      this.log('Daily Meal Plan SAVED to server')

    } catch(err) {
      console.log(err);
    }
  }

  private log(message: string) {
    this.messageService.add(`FoodService: ${message}`);
  }

}
