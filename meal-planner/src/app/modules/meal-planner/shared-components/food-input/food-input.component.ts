import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FoodService } from '../../../../core/services/food.service';

import { Food } from '../../../../shared/interfaces/food.interface';

@Component({
  selector: 'app-food-input',
  templateUrl: './food-input.component.html',
  styleUrls: ['./food-input.component.css']
})
export class FoodInputComponent implements OnInit {
  @Input() isEdit: boolean;
  @Input() foodList: Food[];
  @Input() food: Food;

  @Output() updateOrDeleteEvent = new EventEmitter();
  
  
  constructor(
    private foodService: FoodService,
  ) { }

  ngOnInit(): void {
  }
  
  addFood(): void {
    if (this.foodList.some(food =>
      food.name === this.food.name &&
      food.brand === this.food.brand &&
      food.containerSize === this.food.containerSize
      )
    ) {
      if (!confirm(
        `Food with 
          name=${this.food.name} & 
          brand=${this.food.brand} & 
          containerSize=${this.food.containerSize}
        already exists. Would you like to add anyway?`)
      ) {
        return;
      }
    }
  
    this.foodService.addFood(this.food);
    
    this.food = {};
  }
  
  updateFood(): void {
    this.foodService.updateFood(this.food);
    this.food = {};
    this.updateOrDeleteEvent.emit();
  }

  deleteFood(): void {
    if (!confirm('ARE YOU SURE YOU WANT TO DELETE?')) {
      return;
    }
    
    this.foodService.deleteFood(this.food);
    this.food = {};
    this.updateOrDeleteEvent.emit();
  }

}
