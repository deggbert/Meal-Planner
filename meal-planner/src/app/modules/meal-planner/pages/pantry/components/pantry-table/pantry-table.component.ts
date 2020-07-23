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
  "GROCERY STORE ORDER" = "groceryStoreOrder",
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
  foodToUpdate: Food[] = [];
  groceryItemNumber: number;
  
  isEdit: boolean = false;
  isGroceryTrip: boolean = false;

  headers: string[] = [
    "NAME",
    "BRAND",
    "CONTAINER SIZE",
    "SERVING SIZE/ MEAL PREP",
    "MEAL PREPS/ CONTAINER",
    "GROCERY STORE ORDER",
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
      let length: number = this.pantryItemsData.length;
      while (++index < length) {
        if (mealItem.docId === this.pantryItemsData[index].docId) {
          this.pantryItemsData[index].servings += mealItem.servings;
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

  increaseQuantity(food: Food): void {
    food.pantryQuantity++;
    this.addToUpdateList(food);
  }
  decreaseQuantity(food: Food): void {
    food.pantryQuantity--;
    this.addToUpdateList(food);
  }
  addToUpdateList(food: Food) {
    debugger;
    if (!this.foodToUpdate.some((item => {
      return item.docId === food.docId;
    }))) {
      this.foodToUpdate.push(food);
    }
  }
  update(): void {
    this.isEdit = false;
    this.sortPantryItems();
    this.foodToUpdate.forEach((food) => {
      this.foodService.updateFood(food);
    })
    this.foodToUpdate = [];
  }
  sortPantryItems(): void {
    this.pantryItems.sort((a,b) => {
      return a.groceryStoreOrder - b.groceryStoreOrder;
    });
  }

  startGroceryTrip(): void {
    this.isGroceryTrip = !this.isGroceryTrip;
    this.groceryItemNumber = 0;
  }
  skipGroceryItem(): void {
    if (this.groceryItemNumber === (this.pantryItems.length - 1)) {
      this.update();
      this.isGroceryTrip = !this.isGroceryTrip;
      return;
    }
    this.groceryItemNumber++;
  }
  buyGroceryItem(num: number): void {
    this.pantryItems[num].pantryQuantity++;
    this.addToUpdateList(this.pantryItems[num]);
    if (this.groceryItemNumber === (this.pantryItems.length - 1)) {
      this.update();
      this.isGroceryTrip = !this.isGroceryTrip;
      return;
    }
    this.groceryItemNumber++;
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
