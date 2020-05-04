import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MessageService } from './message.service'; 
import { Food } from './food-interface'


@Injectable({
  providedIn: 'root'
})
export class FoodService {
  
  private foodListUrl = 'api/foodList'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  getFoodList(): Observable<Food[]> {
    return this.http.get<Food[]>(this.foodListUrl).pipe(
      tap(_ => this.log('fetched foodList'))
    );
  }

  addFood(food: Food): Observable<Food> {
    return this.http.post<Food>(this.foodListUrl, food, this.httpOptions).pipe(
      tap((newFood: Food) => this.log(`added food w/ name=${newFood.name} & brand=${newFood.brand}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
