import { Component, OnInit } from '@angular/core';

import { Food } from 'src/app/shared/interfaces/food.interface';

@Component({
  selector: 'app-food-database',
  templateUrl: './food-database.component.html',
  styleUrls: ['./food-database.component.css']
})
export class FoodDatabaseComponent implements OnInit {
  
  isEdit: boolean = false;
  food: Food = {};

  constructor() { }

  ngOnInit(): void {
  }

  modeSelect(mode: string): void {
    if (mode == 'add') {
      this.isEdit = false;
      this.food = {};
    } else {
      this.isEdit = true;
      this.food = {};
    }
  }

  setFood(food: Food) {
    this.food = food;
  } 

  isEmptyObject(obj: any): any {
    return (Object.keys(obj).length === 0);
  }
}
