import { Component, OnInit, Input } from '@angular/core';

import { FoodService } from '../../../../core/services/food.service';

import { Food } from '../../../../shared/interfaces/food.interface';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-food-input',
  templateUrl: './food-input.component.html',
  styleUrls: ['./food-input.component.css']
})
export class FoodInputComponent implements OnInit {
  @Input() isEdit: boolean;
  @Input() food: Food = null;

  foodList$: BehaviorSubject<Food[]>;
  
  constructor(
    private foodService: FoodService,
  ) { 
    this.foodList$ = this.foodService.foodList$;
  }

  ngOnInit(): void {
    this.getFoodList();
  }
  
  getFoodList(): void {
    this.foodService.initializeFoodList().subscribe();
  }
  
  submitFood(): void {
    if (!this.isEdit) {
      this.addFood();
    } else {
      this.updateFood();
    }
  }
  
  addFood() {
    
    if( this.foodList$.value.some(
        food => food.name == this.food.name &&
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
  
    this.foodService.addFood(this.food);

    this.food = {};
  }
  
  updateFood() {
    this.foodService.updateFood(this.food);

    this.food = {};
  }

  deleteFood() {
    this.foodService.deleteFood(this.food);

    this.food = {};
  }

}
