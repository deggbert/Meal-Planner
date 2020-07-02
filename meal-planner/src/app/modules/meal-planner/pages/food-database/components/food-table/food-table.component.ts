import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { FoodService } from 'src/app/core/services/food.service';

import { Food } from 'src/app/shared/interfaces/food.interface';

@Component({
  selector: 'app-food-table',
  templateUrl: './food-table.component.html',
  styleUrls: ['./food-table.component.css']
})
export class FoodTableComponent implements OnInit {
  @Input() foodList: Food[];

  @Output() selectFoodEvent = new EventEmitter<Food>();
  
  headers: string[] = [
    "FOOD",
    "BRAND",
    "CONTAINER SIZE",
    "PRICE",
    "SERVING SIZE",
    "FAT",
    "CARB",
    "PROTEIN",
    // "SERVINGS/ MEAL",
    // "SERVINGS/ CONTAINER",
    // "SERVING SIZE/ MEAL",
    // "MEALS/ CONTAINER",
    // "PRICE/ MEAL",
    // "FAT/ MEAL",
    // "CARB/ MEAL",
    // "PROTEIN/ MEAL",
    // "GROCERY STORE ORDER",
  ]
  

  constructor(
    private foodService: FoodService,
  ) { }

  ngOnInit(): void { }

  getTableValues(food: Food) {
    let values: (string | number)[] = [];
    let fields: string[] = ['name', 'brand', 'containerSize', 'price', 'servingSize', 'fat', 'carb', 'protein'];
    for (let field of fields) {
      values.push(food[field]);
    }
    return values;
  }

  selectFood(food: Food): void {
    this.selectFoodEvent.emit(food);
  }

  // ?? doesn't work when foodList array is an input property (ng change detection probably to blame)
  // trackByFood(index: number, food: Food): string { 
  //   return food.docId; 
  // }

  // ?? used to keep fields in order **let prop of food | keyvalue: originalOrder**
  // originalOrder = (a, b): number => {
  //   return 0;
  // }
}
