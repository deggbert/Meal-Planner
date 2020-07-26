import { Component, OnInit, Input } from '@angular/core';

import { MealItem } from 'src/app/shared/interfaces/daily-meal-plan.interface';
import { Food } from 'src/app/shared/interfaces/food.interface';

enum MealPrepHeaders {
  'FOOD' = 'name',
  'NUMBER OF SERVINGS' = 'servingsPerMeal',
  'TOTAL SERVING SIZE' = 'servingSizePerMealPrep',
  'NUMBER OF CONTAINERS' = 'containersPerMealPrep',
  'SERVING SIZE PER MEAL' = 'servingSizePerMeal',
}
@Component({
  selector: 'app-meal-prep-table',
  templateUrl: './meal-prep-table.component.html',
  styleUrls: ['./meal-prep-table.component.css']
})
export class MealPrepTableComponent implements OnInit {
  @Input() breakfastData: MealItem[];
  @Input() lunchData: MealItem[];
  @Input() dinnerData: MealItem[];
  @Input() mealPrepDays: number;
  @Input() foodList: Food[];

  breakfastMealPrep: Food[];
  lunchMealPrep: Food[];
  dinnerMealPrep: Food[];

  headers: string[] = [
    'FOOD',
    'NUMBER OF SERVINGS',
    'TOTAL SERVING SIZE',
    'NUMBER OF CONTAINERS',
    'SERVING SIZE PER MEAL',
  ]

  constructor() { }

  ngOnInit(): void {
    this.convertMealData();
  }

  convertMealData(): void {
    if (this.breakfastData.length === 0) {
      this.breakfastMealPrep = [];
    } else {
      let breakfast = this.breakfastData.map((breakfastItem: MealItem) => {
        let food = this.foodList.find((foodListItem: Food) => {
          return foodListItem.docId === breakfastItem.docId; 
        });
        let foodClone = {...food};
        foodClone.servingsPerMeal = breakfastItem.servings;
        foodClone.servingSizePerMeal = +(foodClone.servingsPerMeal * foodClone.servingSize).toFixed(2); //TODO: move calcs to different method
        foodClone.containersPerMealPrep = +(foodClone.containerSize / foodClone.servingSizePerMealPrep).toFixed(2);
        foodClone.servingSizePerMealPrep = +(foodClone.servingSizePerMeal * this.mealPrepDays).toFixed(2);
        return foodClone;
      });

      this.breakfastMealPrep = breakfast.filter((food: Food) => {
        return food.mealPrep;
      });
    }

    if (this.lunchData.length === 0) {
      this.lunchMealPrep = [];
    } else {
      let lunch = this.lunchData.map((lunchItem: MealItem) => {
        let food = this.foodList.find((foodListItem: Food) => {
          return foodListItem.docId === lunchItem.docId;
        });
        let foodClone = {...food};
        foodClone.servingsPerMeal = lunchItem.servings;
        foodClone.servingSizePerMeal = +(foodClone.servingsPerMeal * foodClone.servingSize).toFixed(2);
        foodClone.containersPerMealPrep = +(foodClone.containerSize / foodClone.servingSizePerMealPrep).toFixed(2);
        foodClone.servingSizePerMealPrep = +(foodClone.servingSizePerMeal * this.mealPrepDays).toFixed(2);
        return foodClone;
      });

      this.lunchMealPrep = lunch.filter((food: Food) => {
        return food.mealPrep;
      });
    }

    if (this.dinnerData.length === 0) {
      this.dinnerMealPrep = [];
    } else {
      let dinner = this.dinnerData.map((dinnerItem: MealItem) => {
        let food =this.foodList.find((foodListItem: Food) => {
          return foodListItem.docId === dinnerItem.docId;
        });
        let foodClone = {...food}
        foodClone.servingsPerMeal = dinnerItem.servings;
        foodClone.servingSizePerMeal = +(foodClone.servingsPerMeal * foodClone.servingSize).toFixed(2);
        foodClone.containersPerMealPrep = +(foodClone.containerSize / foodClone.servingSizePerMealPrep).toFixed(2);
        foodClone.servingSizePerMealPrep = +(foodClone.servingSizePerMeal * this.mealPrepDays).toFixed(2);
        return foodClone;
      });

      this.dinnerMealPrep = dinner.filter((food: Food) => {
        return food.mealPrep;
      })
    }
  }

  getObjectValues(mealPrepItem: Food) {
    let values: (string | number)[] = [];
    for (let header of this.headers) {
      let value = mealPrepItem[MealPrepHeaders[header]];
      if (typeof value === 'string') {
        value = value[0].toUpperCase() + value.slice(1);
      }
      if (value === undefined) {
        value = 0;
      }
      values.push(value);
    }
    return values;
  }

}
