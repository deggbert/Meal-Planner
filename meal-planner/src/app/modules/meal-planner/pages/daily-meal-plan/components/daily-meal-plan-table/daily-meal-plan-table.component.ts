import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Meal } from 'src/app/shared/interfaces/daily-meal-plan.interface';
import { Food } from 'src/app/shared/interfaces/food.interface';
import { DailyMacros } from 'src/app/shared/interfaces/daily-macros.interface';

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
  selector: 'app-daily-meal-plan-table',
  templateUrl: './daily-meal-plan-table.component.html',
  styleUrls: ['./daily-meal-plan-table.component.css']
})
export class DailyMealPlanTableComponent implements OnInit {
  @Input() selectedFood: Food = {};
  @Input() breakfastData: Meal[];
  @Input() lunchData: Meal[];
  @Input() dinnerData: Meal[];
  @Input() foodList: Food[];
  @Input() dailyMacros: DailyMacros;
  
  @Output() breakfastEvent = new EventEmitter<Food[]>();
  @Output() lunchEvent = new EventEmitter<Food[]>();
  @Output() dinnerEvent = new EventEmitter<Food[]>();
  
  breakfast: Food[] = [];
  lunch: Food [] = [];
  dinner: Food [] = [];

  dailyMealPlan: Food[][] = [this.breakfast, this.lunch, this.dinner];

  breakfastFatSum: number;
  breakfastCarbSum: number;
  breakfastProteinSum: number;
  lunchFatSum: number;
  lunchCarbSum: number;
  lunchProteinSum: number;
  dinnerFatSum: number;
  dinnerCarbSum: number;
  dinnerProteinSum: number;
  fatSum: number;
  carbSum: number;
  proteinSum: number;

  fatDiff: number;
  carbDiff: number;
  proteinDiff: number;

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
  ];


  constructor() { }

  ngOnInit(): void {
    if (this.breakfastData.length === 0) {
      this.breakfast = [];
      this.breakfastEvent.emit(this.breakfast);
  } else {
      this.breakfast = this.breakfastData.map((breakfastItem) => {
        let food = this.foodList.find((foodListItem) => {
          return foodListItem.docId === breakfastItem.docId; 
        });
        let foodClone = {...food};
        foodClone.servingsPerMeal = breakfastItem.servings;
        this.calculateValues(foodClone);
        return foodClone;
      });
      this.breakfastEvent.emit(this.breakfast);
    }

    if (this.lunchData.length === 0) {
      this.lunch = [];
      this.lunchEvent.emit(this.lunch);

    } else {
      this.lunch = this.lunchData.map((lunchItem) => {
        let food = this.foodList.find((foodListItem) => {
          return foodListItem.docId === lunchItem.docId;
        });
        let foodClone = {...food};
        foodClone.servingsPerMeal = lunchItem.servings;
        this.calculateValues(foodClone);
        return foodClone;
      });
      this.lunchEvent.emit(this.lunch);
    }

    if (this.dinnerData.length === 0) {
      this.dinner = [];
      this.dinnerEvent.emit(this.dinner);
    } else {
      this.dinner = this.dinnerData.map((dinnerItem) => {
        let food =this.foodList.find((foodListItem) => {
          return foodListItem.docId === dinnerItem.docId;
        });
        let foodClone = {...food}
        foodClone.servingsPerMeal = dinnerItem.servings;
        this.calculateValues(foodClone);
        return foodClone;
      });
      this.dinnerEvent.emit(this.dinner);
    }
    this.calcCalorieSums();
  }

  ngOnChanges() {
    this.calcCalorieSums();
  }

  addToBreakfast(): void {
    this.breakfast.push({...this.selectedFood});
    this.selectedFood = {};
    this.breakfastEvent.emit(this.breakfast);
  }
  
  addToLunch(): void {
    this.lunch.push({...this.selectedFood});
    this.selectedFood = {};
    this.lunchEvent.emit(this.lunch);

  }
  
  addToDinner(): void {
    this.dinner.push({...this.selectedFood});
    this.selectedFood = {};
    this.dinnerEvent.emit(this.dinner);

  }

  removeFood(food: Food, meal: string): void {
    if (meal === 'breakfast') {
      this.breakfast.splice(this.breakfast.indexOf(food), 1);
      this.breakfastEvent.emit(this.breakfast);
    } else if (meal === 'lunch') {
      this.lunch.splice(this.lunch.indexOf(food), 1);
      this.lunchEvent.emit(this.lunch);
    } else {
      this.dinner.splice(this.dinner.indexOf(food), 1);
      this.dinnerEvent.emit(this.dinner);
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

  calcCalorieSums(): void {
    // FAT
    this.breakfastFatSum = this.breakfast.reduce((sum: number, item: Food) => {
      return +(sum + item.fatPerMeal).toFixed(1);
    }, 0);
    this.lunchFatSum = this.lunch.reduce((sum: number, item: Food) => {
      return +(sum + item.fatPerMeal).toFixed(1);
    }, 0);
    this.dinnerFatSum = this.dinner.reduce((sum: number, item: Food) => {
      return +(sum + item.fatPerMeal).toFixed(1);
    }, 0);
    this.fatSum = +(this.breakfastFatSum + this.lunchFatSum + this.dinnerFatSum).toFixed(1);
    
    // CARB
    this.breakfastCarbSum = this.breakfast.reduce((sum: number, item: Food) => {
      return +(sum + item.carbPerMeal).toFixed(1);
    }, 0);
    this.lunchCarbSum = this.lunch.reduce((sum: number, item: Food) => {
      return +(sum + item.carbPerMeal).toFixed(1);
    }, 0);
    this.dinnerCarbSum = this.dinner.reduce((sum: number, item: Food) => {
      return +(sum + item.carbPerMeal).toFixed(1);
    }, 0);
    this.carbSum = +(this.breakfastCarbSum + this.lunchCarbSum + this.dinnerCarbSum).toFixed(1);
    
    // PROTEIN
    this.breakfastProteinSum = this.breakfast.reduce((sum: number, item: Food) => {
      return +(sum + item.proteinPerMeal).toFixed(1);
    }, 0);
    this.lunchProteinSum = this.lunch.reduce((sum: number, item: Food) => {
      return +(sum + item.proteinPerMeal).toFixed(1);
    }, 0);
    this.dinnerProteinSum = this.dinner.reduce((sum: number, item: Food) => {
      return +(sum + item.proteinPerMeal).toFixed(1);
    }, 0);
    this.proteinSum = +(this.breakfastProteinSum + this.lunchProteinSum + this.dinnerProteinSum).toFixed(1);

    // DIFFS
    this.fatDiff = +(this.dailyMacros.fat.calories - this.fatSum).toFixed(1);
    this.carbDiff = +(this.dailyMacros.carb.calories - this.carbSum).toFixed(1);
    this.proteinDiff = +(this.dailyMacros.protein.calories - this.proteinSum).toFixed(1);
  }

  getObjectValues(food: Food): (string | number)[] {
    let values: (string | number)[] = [];
    for (let header of this.headers) {
      let value = food[FoodHeaders[header]];
      values.push(value);
    }
    return values;
  }

  isEmptyObject(obj: any): any {
    return (Object.keys(obj).length === 0);
  }

  diffColor(macroDiff: number): string {
    if( macroDiff > 50) {
      return 'under';
    } else if ( macroDiff < 0) {
      return 'over';
    } else {
      return 'close';
    }
  }

}
