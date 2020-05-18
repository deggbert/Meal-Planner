import { Component, OnInit, Input } from '@angular/core';

import { FoodService } from '../food.service';

import { Food } from '../food-interface';

@Component({
  selector: 'app-food-input',
  templateUrl: './food-input.component.html',
  styleUrls: ['./food-input.component.css']
})
export class FoodInputComponent implements OnInit {
  @Input() editFood: boolean = false;
  @Input() food: Food = {};

  foodList: Food[];

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
  
  submitFood(): void {
    if (!this.editFood) {
      this.addFood();
    } else {
      this.updateFood();
    }
  }
  
  addFood() {
    
    if( this.foodList.some(food => food.name == this.food.name &&
        food.brand === this.food.brand &&
        food.containerSize === this.food.containerSize) 
      ) {
      
      if( !confirm(
        `Food with 
          name=${this.food.name} & 
          brand=${this.food.brand} & 
          containerSize=${this.food.containerSize}
        already exists. Would you like to add anyway?`)
      ) {
        return;
      };
    }
  
    this.foodService.addFood(this.food)
      .subscribe(food => this.foodList.push(food));
      this.food = {};
  }
  
  updateFood() {
    this.foodService.updateFood(this.food)
      .subscribe();
  }

  deleteFood() {
    this.foodList = this.foodList.filter(food => food !== this.food);
    this.foodService.deleteFood(this.food)
      .subscribe();
    this.food = {};
  }

}
