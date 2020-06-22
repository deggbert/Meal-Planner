import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { FoodService } from '../../../../core/services/food.service';

import { Food } from '../../../../shared/interfaces/food.interface';
import { SearchTerms } from '../../../../shared/interfaces/search-terms.interface';


@Component({
  selector: 'app-food-search',
  templateUrl: './food-search.component.html',
  styleUrls: ['./food-search.component.css']
})
export class FoodSearchComponent implements OnInit {
  @Output() selectFoodEvent = new EventEmitter<Food>()

  foodList$: Observable<Food[]>;
  // ?? Doesn't work if name and brand aren't initialized ==> becuase terms.brand = undefined when foodservice tries to search
  terms: SearchTerms = {
    name: '', 
    brand: '',
  };
  
  private searchTerms = new Subject<SearchTerms> ();

  constructor(
    private foodService: FoodService,
  ) { }

  ngOnInit(): void { 

    this.foodList$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged((a,b) => a.name === b.name && a.brand === b.brand), 
      switchMap((terms: SearchTerms) => this.foodService.searchFoodList(terms)),
    );

  }

  search(): void {
    // ?? const vs let
    let cloneTerms = {...this.terms };
    this.searchTerms.next(cloneTerms);
    
    // this.searchTerms.next({name: "the", brand: "" })
    // setTimeout( () => this.searchTerms.next({name: "the", brand: "" }), 2500);
    // setTimeout( () => this.searchTerms.next({name: "th", brand: "" }), 5000);
  }

  selectFood(food: Food): void {
    this.selectFoodEvent.emit(food);
  } 

}
