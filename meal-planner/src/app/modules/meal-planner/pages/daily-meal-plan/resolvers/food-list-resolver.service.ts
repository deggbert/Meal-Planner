import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { FoodService } from 'src/app/core/services/food.service';

import { Food } from 'src/app/shared/interfaces/food.interface';

@Injectable({
  providedIn: 'root'
})
export class FoodListResolverService implements Resolve<Food[]>{

  constructor(
    private router: Router,
    private foodService: FoodService,
  ) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Food[]> {
    return this.foodService.getFoodListObservable().pipe(
      take(1)
    );
  }

}
