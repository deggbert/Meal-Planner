import { Component, OnInit } from '@angular/core';

import { Food } from '../food-interface';

@Component({
  selector: 'app-daily-meal-plan',
  templateUrl: './daily-meal-plan.component.html',
  styleUrls: ['./daily-meal-plan.component.css'],
})
export class DailyMealPlanComponent implements OnInit {

  headers = [
    "ID",
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

  selectedFood: Food = {};
  
  breakfast: Food[] = [];
  lunch: Food [] = [];
  dinner: Food [] = [];

  
  constructor() { }

  ngOnInit(): void {
  }

  addToBreakfast(): void {
    this.breakfast.push(this.selectedFood);
    this.selectedFood = {};
  }
  
  addToLunch(): void {
    this.lunch.push(this.selectedFood);
    this.selectedFood = {};
  }
  
  addToDinner(): void {
    this.dinner.push(this.selectedFood);
    this.selectedFood = {};
  }

  calculateValues(food: Food): void {
    food.servingsPerContainer = food.containerSize / food.servingSize;
    food.servingSizePerMeal = food.servingSize * food.servingsPerMeal;
    food.mealsPerContainer = food.containerSize / food.servingSizePerMeal;
    food.pricePerMeal = +(food.price / food.mealsPerContainer).toFixed(2);
    food.fatPerMeal = +((food.fat * 9) * food.servingsPerMeal).toFixed(1);
    food.carbPerMeal = +((food.carb * 4) * food.servingsPerMeal).toFixed(1);
    food.proteinPerMeal = +((food.protein * 4) * food.servingsPerMeal).toFixed(1);
  }

  isEmptyObject(obj: any): any {
    return (Object.keys(obj).length === 0);
  }

  originalOrder = (a, b): number => {
    return 0;
  }

}
