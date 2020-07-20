import { Component, OnInit, Input } from '@angular/core';

import { uniqWith } from 'lodash';

import { Meal } from 'src/app/shared/interfaces/daily-meal-plan.interface';
import { Food } from 'src/app/shared/interfaces/food.interface';

@Component({
  selector: 'app-pantry-table',
  templateUrl: './pantry-table.component.html',
  styleUrls: ['./pantry-table.component.css']
})
export class PantryTableComponent implements OnInit {
  @Input() breakfastData: Meal[];
  @Input() lunchData: Meal[];
  @Input() dinnerData: Meal[];
  @Input() foodList: Food[];

  pantryItems: Meal[];

  headers: string[] = [

  ]

  constructor() { }

  ngOnInit(): void {
    this.convertMealsToPantryItems();
  }
  
  convertMealsToPantryItems(): void {
    let mealPlanItems: Meal[] = [...this.breakfastData, ...this.lunchData, ...this.dinnerData];
    debugger;

    this.pantryItems = uniqWith(mealPlanItems, (arrVal: Meal, othVal: Meal) => {
      if (arrVal.docId == othVal.docId) {
        arrVal.servings += othVal.servings;
      }
      return arrVal.docId === othVal.docId;
    });


    // let pantryItemsSet = new Set();
    // mealPlanItems.forEach((item) => {
    //   mealPlanItems.filter((item) => {
    //     item.
    //   }
    //   )
    // });
    // mealPlanItems.filter()
    // Array.from()
  }
}
