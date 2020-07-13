import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DailyMealPlanService } from 'src/app/core/services/daily-meal-plan.service';

import { DailyMealPlan, Meal } from 'src/app/shared/interfaces/daily-meal-plan.interface';
import { Food } from 'src/app/shared/interfaces/food.interface';
import { UserInfo } from 'src/app/shared/interfaces/user-info.interface';

enum FoodHeaders {
  'FOOD' = 'name',
  'BRAND' = 'brand',
  'CONTAINER SIZE' = 'containerSize',
  'PRICE' = 'price',
  'SERVING SIZE' = 'servingSize',
  'FAT' = 'fat',
  'CARB' = 'carb',
  'PROTEIN' = 'protein',
  'SERVINGS/ MEAL' = 'servingsPerMeal',
  'SERVINGS/ CONTAINER' = 'servingsPerContainer',
  'SERVING SIZE/ MEAL' = 'servingSizePerMeal',
  'MEALS/ CONTAINER' = 'mealsPerContainer',
  'PRICE/ MEAL' = 'pricePerMeal',
  'FAT/ MEAL' = 'fatPerMeal',
  'CARB/ MEAL' = 'carbPerMeal',
  'PROTEIN/ MEAL' = 'proteinPerMeal',
  'GROCERY STORE ORDER' = 'groceryStoreOrder',
}

@Component({
  selector: 'app-daily-meal-plan',
  templateUrl: './daily-meal-plan.component.html',
  styleUrls: ['./daily-meal-plan.component.css'],
})
export class DailyMealPlanComponent implements OnInit {
  
  headers = [
    "FOOD",
    "BRAND",
    "CONTAINER SIZE",
    "PRICE",
    "SERVING SIZE",
    "FAT",
    "CARB",
    "PROTEIN",
    "SERVINGS/ MEAL",
    "SERVINGS/ CONTAINER",
    "SERVING SIZE/ MEAL",
    "MEALS/ CONTAINER",
    "PRICE/ MEAL",
    "FAT/ MEAL",
    "CARB/ MEAL",
    "PROTEIN/ MEAL",
    "GROCERY STORE ORDER",
  ];

  breakfastData: Meal[];
  lunchData: Meal[];
  dinnerData: Meal[];
  foodList: Food[];
  userInfo: UserInfo;

  breakfast: Food[] = [];
  lunch: Food [] = [];
  dinner: Food [] = [];
  
  selectedFood: Food = {};
  
  constructor(
    private route: ActivatedRoute,
    private dailyMealPlanService: DailyMealPlanService,
  ) { 
    this.route.data.subscribe((data) => {
      this.breakfastData = data.dailyMealPlan.breakfast;
      this.lunchData = data.dailyMealPlan.lunch;
      this.dinnerData = data.dailyMealPlan.dinner;
      this.foodList = data.foodList;
      this.userInfo = data.userInfo;
    })
  }

  ngOnInit(): void { 
    if (this.breakfastData.length === 0) {
      this.breakfast = [];
    } else {
      this.breakfast = this.breakfastData.map((breakfastItem) => {
        let food = this.foodList.find((foodListItem) => {
          return foodListItem.docId === breakfastItem.docId; 
        })
        food.servingsPerMeal = breakfastItem.servings;
        this.calculateValues(food);
        return food;
      });
    }

    if (this.lunchData.length === 0) {
      this.lunch = [];
    } else {
      this.lunch = this.lunchData.map((lunchItem) => {
        let food = this.foodList.find((foodListItem) => {
          return foodListItem.docId === lunchItem.docId;
        })
        food.servingsPerMeal = lunchItem.servings;
        this.calculateValues(food);
        return food;
      });
    }

    if (this.dinnerData.length === 0) {
      this.dinner = [];
    } else {
      this.dinner = this.dinnerData.map((dinnerItem) => {
        let food = this.foodList.find((foodListItem) => {
          return foodListItem.docId === dinnerItem.docId;
        })
        food.servingsPerMeal = dinnerItem.servings;
        this.calculateValues(food);
        return food;
      });
    }
  }

  addToBreakfast(): void {
    this.breakfast.push({...this.selectedFood});
    this.selectedFood = {};
  }
  
  addToLunch(): void {
    this.lunch.push({...this.selectedFood});
    this.selectedFood = {};
  }
  
  addToDinner(): void {
    this.dinner.push({...this.selectedFood});
    this.selectedFood = {};
  }

  removeFood(food: Food, meal: string): void {
    if (meal === 'breakfast') {
      this.breakfast.splice(this.breakfast.indexOf(food), 1);
    } else if (meal === 'lunch') {
      this.lunch.splice(this.lunch.indexOf(food), 1);
    } else {
      this.dinner.splice(this.dinner.indexOf(food), 1);
    }
  }

  calculateValues(food: Food): void {
    food.servingsPerContainer = +(food.containerSize / food.servingSize).toFixed(2);
    food.servingSizePerMeal = +(food.servingSize * food.servingsPerMeal).toFixed(2);
    food.mealsPerContainer = +(food.containerSize / food.servingSizePerMeal).toFixed(2);
    food.pricePerMeal = +(food.price / food.mealsPerContainer).toFixed(2);
    food.fatPerMeal = +((food.fat * 9) * food.servingsPerMeal).toFixed(1);
    food.carbPerMeal = +((food.carb * 4) * food.servingsPerMeal).toFixed(1);
    food.proteinPerMeal = +((food.protein * 4) * food.servingsPerMeal).toFixed(1);
  }

  updateDailyMealPlan(): void {
    this.dailyMealPlanService.updateDailyMealPlan(this.breakfast, this.lunch, this.dinner);
  }

  isEmptyObject(obj: any): any {
    return (Object.keys(obj).length === 0);
  }
  
  getObjectValues(food: Food) {
    let values: (string | number)[] = [];
    for (let header of this.headers) {
      let value = food[FoodHeaders[header]];
      values.push(value);
    }
    return values;
  }
  originalOrder = (a, b): number => {
    return 0;
  }

}
