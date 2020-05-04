import { Component, OnInit } from '@angular/core';

import { FoodService } from '../food.service';

import { Food } from '../food-interface';

@Component({
  selector: 'app-food-input',
  templateUrl: './food-input.component.html',
  styleUrls: ['./food-input.component.css']
})
export class FoodInputComponent implements OnInit {
  food: Food = {};

  constructor(
    private foodService: FoodService,
  ) { }

  ngOnInit(): void {
  }
  
  submitFood(foodInputForm): void {
    this.foodService.addFood(foodInputForm.value)
      .subscribe();
    foodInputForm.reset();
  }
  // submitFood(food: Food): void {
  //   this.foodService.addFood(food)
  //     .subscribe();
  // }

}