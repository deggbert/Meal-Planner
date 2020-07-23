import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { DailyMealPlanService } from 'src/app/core/services/daily-meal-plan.service';

import { MealItem } from 'src/app/shared/interfaces/daily-meal-plan.interface';
import { Food } from 'src/app/shared/interfaces/food.interface';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css']
})
export class PantryComponent implements OnInit {

  breakfastData: MealItem[];
  lunchData: MealItem[];
  dinnerData: MealItem[];
  mealPrepDays: number;
  foodList: Food[];

  isGroceryTrip: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dailyMealPlanService: DailyMealPlanService
  ) { 
    this.route.data.subscribe((data) => {
      this.breakfastData = data.dailyMealPlan.breakfast;
      this.lunchData = data.dailyMealPlan.lunch;
      this.dinnerData = data.dailyMealPlan.dinner;
      this.mealPrepDays = data.dailyMealPlan.mealPrepDays;
      this.foodList = data.foodList;
    }); 
  }

  ngOnInit(): void {
  }

}
