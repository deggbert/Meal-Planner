import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Food } from './food-interface';
import { User } from './user-interface';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const foodList = [
      { 
        id: 1,
        name: 'Tofu',
        brand: 'Masoya Organic',
        containerSize: 16,
        price: 2.99,
        servingSize: 16 / 5,
        fat: 7,
        carb: 2,
        protein: 14,
        // // set values
        // servingsPerMeal: 0,
        // groceryStoreOrder: 0,
        // // calculated values
        // servingsPerContainer: 0,
        // servingSizePerMeal: 0,
        // mealsPerContainer: 0,
        // pricePerMeal: 0,
        // fatPerMeal: 0,
        // carbPerMeal: 0,
        // proteinPerMeal:0,
      },
      { 
        id: 2,
        name: 'Blueberries',
        brand: "Driscoll's",
        containerSize: 11,
        price: 3.34,
        servingSize: 1,
        fat: 0.3,
        carb: 14,
        protein: 1,
      },
      { 
        id: 3,
        name: 'Cottage Cheese',
        brand: "Friendship Dairies 1%",
        containerSize: 24,
        price: 3.49,
        servingSize: 0.5,
        fat: 15,
        carb: 4,
        protein: 16,
      },
    ];

    const users = [];
    
    return {foodList, users};
  }
  
  genId<T extends Food | User>(dbArray: T[]): number {
    return dbArray.length > 0 ? Math.max(...dbArray.map(t => t.id)) + 1 : 1;
  }
  // genId(foodList: Food[]): number {
  //   return foodList.length > 0 ? Math.max(...foodList.map(food => food.id)) + 1 : 1;
  // }

  constructor() { }
}
