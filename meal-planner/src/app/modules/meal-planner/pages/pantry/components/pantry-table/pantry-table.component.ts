import { Component, OnInit, Input } from '@angular/core';

import { FoodService } from 'src/app/core/services/food.service';

import { MealItem } from 'src/app/shared/interfaces/daily-meal-plan.interface';
import { Food } from 'src/app/shared/interfaces/food.interface';

enum PantryItemsHeaders {
  "NAME" = "name",
  "BRAND" = "brand",
  "CONTAINER SIZE" = "containerSize",
  "MEAL PREP" = "mealPrep",
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
  groceryStoreItems: Food[] = [];
  groceryItemNumber: number;
  onlineItems: Food[] = [];
  
  isEdit: boolean = false;
  isGroceryTrip: boolean = false;

  headers: string[] = [
    "NAME",
    "BRAND",
    "CONTAINER SIZE",
    "MEAL PREP",
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
      this.sortPantryItems();
    }
    
    update(): void {
      this.foodToUpdate.forEach((food) => {
        this.foodService.updateFood(food);
      })
      this.foodToUpdate = [];
    }
    
  convertMealItemsToPantryItems(): void {
    let mealPlanItems: MealItem[] = [...this.breakfastData, ...this.lunchData, ...this.dinnerData];

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
      if (!foodClone.buyOption) {
        foodClone.buyOption = 'groceryStore';
      }
      if (!foodClone.mealPrep) {
        foodClone.mealPrep = false;
        this.addToUpdateList(foodClone);
      }
      foodClone.servingSizePerMealPrep = +(pantryItem.servings * foodClone.servingSize * this.mealPrepDays).toFixed(2);
      foodClone.mealPrepsPerContainer = +(foodClone.containerSize / foodClone.servingSizePerMealPrep ).toFixed(2);
      return foodClone;
    });
  }

  sortPantryItems(): void {
    this.groceryStoreItems = this.pantryItems.filter((pantryItem) => {
      return pantryItem.buyOption === 'groceryStore';
    });
    this.onlineItems = this.pantryItems.filter((pantryItem) => {
      return pantryItem.buyOption === 'online';
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
    if (!this.foodToUpdate.some((item => {
      return item.docId === food.docId;
    }))) {
      this.foodToUpdate.push(food);
    }
  }

  buyAtGroceryStore(food: Food): boolean {
    return food.buyOption === 'groceryStore' ;
  }
  buyOnline(food: Food): boolean {
    return food.buyOption === 'online' ;
  }
  changeBuyOption(food: Food) {
    if (food.buyOption === 'groceryStore') {
      food.buyOption = 'online';
      food.groceryStoreOrder = 'ONLINE';
    } else {
      food.buyOption = 'groceryStore';
    }
    this.sortPantryItems();
    this.addToUpdateList(food);
  }
  
  startGroceryTrip(): void {
    this.isGroceryTrip = !this.isGroceryTrip;
    this.groceryItemNumber = 0;
  }
  skipGroceryItem(): void {
    if (this.groceryItemNumber === (this.groceryStoreItems.length - 1)) {
      this.update();
      this.isGroceryTrip = !this.isGroceryTrip;
      return;
    }
    this.groceryItemNumber++;
  }
  buyGroceryItem(num: number): void {
    this.groceryStoreItems[num].pantryQuantity++;
    this.addToUpdateList(this.groceryStoreItems[num]);
  if (this.groceryItemNumber === (this.groceryStoreItems.length - 1)) {
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
      if (value === false) {
        value = 'NO'
      }
      if (value === true) {
        value = 'YES';
      }
      if (value === undefined) {
        value = 0;
      }
      values.push(value);
    }
    return values;
  }
}
