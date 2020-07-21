import { Component, OnInit, Input } from '@angular/core';

import { FoodService } from 'src/app/core/services/food.service';

import { MealItem } from 'src/app/shared/interfaces/daily-meal-plan.interface';
import { Food } from 'src/app/shared/interfaces/food.interface';

enum PantryItemsHeaders {
  "NAME" = "name",
  "BRAND" = "brand",
  "CONTAINER SIZE" = "containerSize",
  "SERVING SIZE/ MEAL PREP" = "servingSizePerMealPrep",
  "MEAL PREPS/ CONTAINER" = "mealPrepsPerContainer",
  "PANTRY QUANTITY" = "pantryQuantity",
}
@Component({
  selector: 'app-pantry-table',
  templateUrl: './pantry-table.component.html',
  styleUrls: ['./pantry-table.component.css']
})
export class PantryTableComponent implements OnInit {
  @Input() breakfastData: MealItem[];
  @Input() lunchData: MealItem[];
  @Input() dinnerData: MealItem[];
  @Input() mealPrepDays: number;
  @Input() foodList: Food[];

  pantryItemsData: MealItem[] = [];
  pantryItems: Food[];
  updateItems: Food[] = [];
  
  isEdit: boolean = false;

  headers: string[] = [
    "NAME",
    "BRAND",
    "CONTAINER SIZE",
    "SERVING SIZE/ MEAL PREP",
    "MEAL PREPS/ CONTAINER",
    "PANTRY QUANTITY",
  ];
  
  constructor(
    private foodService: FoodService,
  ) { }

  ngOnInit(): void {
    this.convertMealItemsToPantryItems();
  }
  
  convertMealItemsToPantryItems(): void {
    let mealPlanItems: MealItem[] = [...this.breakfastData, ...this.lunchData, ...this.dinnerData];
    
    let pantryItemsData: MealItem[] = [];

    mealPlanItems.forEach((mealItem) => {
      let index: number = -1;
      let length: number = pantryItemsData.length;
      while (++index < length) {
        if (mealItem.docId === pantryItemsData[index].docId) {
          pantryItemsData[index].servings += mealItem.servings;
          return; 
        }
      }
      this.pantryItemsData.push(mealItem);
    });

    this.pantryItems = this.pantryItemsData.map((pantryItem) => {
      let food = this.foodList.find((foodListItem) => {
        return foodListItem.docId === pantryItem.docId;
      });
      let foodClone = {...food};
      foodClone.servingSizePerMealPrep = +(pantryItem.servings * foodClone.servingSize* this.mealPrepDays).toFixed(2);
      foodClone.mealPrepsPerContainer = +(foodClone.containerSize / foodClone.servingSizePerMealPrep ).toFixed(2);
      return foodClone;
    });
  }

  toggleEdit(): void {
    this.isEdit = !this.isEdit;
  }

  update(): void {
    this.updateItems.forEach((food) => {
      this.foodService.updateFood(food);
    })
  }

  increaseQuantity(food: Food): void {
    food.pantryQuantity++;
    this.updateItems.push(food);
  }
  decreaseQuantity(food: Food): void {
    food.pantryQuantity--;
    this.updateItems.push(food);
  }

  getObjectValues(pantryItem: Food) {
    let values: (string | number)[] = [];
    for (let header of this.headers) {
      let value = pantryItem[PantryItemsHeaders[header]];
      if (typeof value === 'string') {
        value = value[0].toUpperCase() + value.slice(1);
      }
      if (!value) {
        value = 0;
      }
      values.push(value);
    }
    return values;
  }
}
