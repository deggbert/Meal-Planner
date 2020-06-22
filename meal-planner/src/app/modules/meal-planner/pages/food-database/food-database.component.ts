import { Component, OnInit } from '@angular/core';

import { Food } from 'src/app/shared/interfaces/food.interface';

@Component({
  selector: 'app-food-database',
  templateUrl: './food-database.component.html',
  styleUrls: ['./food-database.component.css']
})
export class FoodDatabaseComponent implements OnInit {
  
  isEdit: boolean = false;
  // ?? Can this be initialized as null using? possible to use optional chaining in input component
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

  setFood(food: Food): void {
    this.food = food;
  } 

  isEmptyObject(obj: any): any {
    return (Object.keys(obj).length === 0);
  }
}
