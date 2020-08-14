import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DailyMealPlanService } from 'src/app/core/services/daily-meal-plan.service';

import { MealItem } from 'src/app/shared/interfaces/daily-meal-plan.interface';
import { Food } from 'src/app/shared/interfaces/food.interface';
import { UserInfo } from 'src/app/shared/interfaces/user-info.interface';
import { DailyMacros } from 'src/app/shared/interfaces/daily-macros.interface';

// TODO: add notification when you access page if your food data has been updated so you know that your meal plan values have changed
// TODO: disable update button if nothing has changed
@Component({
  selector: 'app-daily-meal-plan',
  templateUrl: './daily-meal-plan.page.html',
  styleUrls: ['./daily-meal-plan.page.css'],
})
export class DailyMealPlanComponent implements OnInit {
  breakfastData: MealItem[];
  lunchData: MealItem[];
  dinnerData: MealItem[];
  cutCalories: number;
  fatChosen: string;
  proteinChosen: string;

  foodList: Food[];
  userInfo: UserInfo;

  breakfast: Food[];
  lunch: Food[];
  dinner: Food[];
  
  dailyMacros: DailyMacros;

  mealPrepDays: number;

  selectedFood: Food = {};
  
  constructor(
  private route: ActivatedRoute,
    private dailyMealPlanService: DailyMealPlanService,
  ) { 
    this.route.data.subscribe((data) => {
      this.breakfastData = data.dailyMealPlan.breakfast;
      this.lunchData = data.dailyMealPlan.lunch;
      this.dinnerData = data.dailyMealPlan.dinner;
      this.cutCalories = data.dailyMealPlan.cutCalories;
      this.fatChosen = data.dailyMealPlan.fatChosen;
      this.proteinChosen = data.dailyMealPlan.proteinChosen;
      this.mealPrepDays = data.dailyMealPlan.mealPrepDays;

      this.foodList = data.foodList;

      this.userInfo = data.userInfo;
    })
  }

  ngOnInit(): void { }

  updateDailyMealPlan(): void {
    this.dailyMealPlanService.updateDailyMealPlan(this.breakfast, this.lunch, this.dinner, this.cutCalories, this.dailyMacros.fat.chosen, this.dailyMacros.protein.chosen,
      this.mealPrepDays);
  }
}
