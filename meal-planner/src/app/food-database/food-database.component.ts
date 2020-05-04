import { Component, OnInit } from '@angular/core';

import { FoodService } from '../food.service';

import { Food } from '../food-interface';

@Component({
  selector: 'app-food-database',
  templateUrl: './food-database.component.html',
  styleUrls: ['./food-database.component.css']
})
export class FoodDatabaseComponent implements OnInit {
  
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

  originalOrder = (a, b): number => {
    return 0;
  }
  
}
