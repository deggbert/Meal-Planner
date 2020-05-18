import { Component, OnInit } from '@angular/core';

import { FoodService } from '../food.service';

import { Food } from '../food-interface';

@Component({
  selector: 'app-food-database',
  templateUrl: './food-database.component.html',
  styleUrls: ['./food-database.component.css']
})
export class FoodDatabaseComponent implements OnInit {
  
  headers: string[] = [
    "ID",
    "FOOD",
    "BRAND",
    "PRICE",
    "CONTAINER SIZE",
    "SERVING SIZE",
    "FAT",
    "CARB",
    "PROTEIN",
    "SERVINGS/ MEAL",
    "GROCERY STORE ORDER",
    "SERVINGS/ CONTAINER",
    "SERVING SIZE/ MEAL",
    "MEALS/ CONTAINER",
    "PRICE/ MEAL",
    "FAT/ MEAL",
    "CARB/ MEAL",
    "PROTEIN/ MEAL",
  ]
  foodList: Food[] = [];

  constructor(
    private foodService: FoodService,
  ) { }

  ngOnInit(): void {
    this.getFoodList();
  }

  getFoodList(): void {
    this.foodService.getFoodList()
      .subscribe(foodList => this.foodList = foodList);
  }

  // TODO: doesn't work when leaving component and coming back, probably unnecessary
  trackByFoods(index: number, food: Food): number { 
    return food.id; 
  }

  originalOrder = (a, b): number => {
    return 0;
  }
  
}
