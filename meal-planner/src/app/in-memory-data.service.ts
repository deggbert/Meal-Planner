import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Food } from './food-interface';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const foodList = [
      { 
        name: 'THE',
        brand: 'TEST',
        price: 11,
        containerSize: 12,
        servingSize: 13,
        fat: 14,
        carb: 15,
        protein: 16,
        // set values
        servingsPerMeal: 17,
        groceryStoreOrder: 18,
        // calculated values
        servingsPerContainer: 19,
        totalServingsPerMeal: 20,
        mealsPerContainer: 21,
        pricePerMeal: 22,
        fatPerMeal: 23,
        carbPerMeal: 24,
        proteinPerMeal: 25 
      },
    ];
    
    return {foodList};
  }
  
  genId(foodList: Food[]): number {
    return foodList.length > 0 ? Math.max(...foodList.map(food => food.id)) + 1 : 1;
  }
  constructor() { }
}
