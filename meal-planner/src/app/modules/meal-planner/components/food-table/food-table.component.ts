import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs'

import { FoodService } from 'src/app/core/services/food.service';

import { Food } from 'src/app/shared/interfaces/food.interface';

@Component({
  selector: 'app-food-table',
  templateUrl: './food-table.component.html',
  styleUrls: ['./food-table.component.css']
})
export class FoodTableComponent implements OnInit {
  
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
  
  foodList$: Observable<Food[]>;

  constructor(
    private foodService: FoodService,
  ) { }

  ngOnInit(): void {
    this.foodList$ = this.foodService.foodList$;
  }

  getTableValues(food: Food) {
    let values: (string | number)[] = [];
    let fields: string[] = ['name', 'brand', 'containerSize', 'price', 'servingSize', 'fat', 'carb', 'protein'];
    for (let field of fields) {
      values.push(food[field]);
    }
    return values;
  }

  // TODO: doesn't work when leaving component and coming back, probably unnecessary
  trackByFoods(index: number, food: Food): number { 
    return food.id; 
  }

  // TODO: used to keep fields in order **let prop of food | keyvalue: originalOrder**
  // originalOrder = (a, b): number => {
  //   return 0;
  // }

}
