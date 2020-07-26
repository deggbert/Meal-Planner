import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { FoodService } from 'src/app/core/services/food.service';

import { Food } from 'src/app/shared/interfaces/food.interface';
import { Subscription } from 'rxjs';
import { FoodSearchComponent } from '../../../shared-components/food-search/food-search.component';

@Component({
  selector: 'app-food-database',
  templateUrl: './food-database.page.html',
  styleUrls: ['./food-database.page.css']
})
export class FoodDatabaseComponent implements OnInit, OnDestroy {
  @ViewChild(FoodSearchComponent) public foodSearch: FoodSearchComponent;  //??** Is there a way to do this with template reference variable
  
  isEdit: boolean = false; 
  // ?? Can this be initialized as null using? possible to use optional chaining in input component
  foodListSub: Subscription;
  foodList: Food[] = [];
  food: Food = {};


  constructor(
    private foodService: FoodService
  ) { }

  ngOnInit(): void {
    this.foodListSub = this.foodService.getFoodListObservable().subscribe(foodList => {
      foodList.sort((a, b) => {
        if (a.name.match(/\D+/g)[0] === a.name.match(/\D+/g)[0]) {
          return +a.name.match(/\d+/) - +b.name.match(/\d+/)
        }
        return a.name.localeCompare(b.name);
      });
      this.foodList = foodList;
    });
  }

  n

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

  ngOnDestroy(): void {
    this.foodListSub.unsubscribe();
  }
}
