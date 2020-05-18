import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MessageService } from './message.service'; 
import { Food } from './food-interface';
import { SearchTerms } from './searchTerms-interface';


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
  
  /** GET foodList from server */
  getFoodList(): Observable<Food[]> {
    return this.http.get<Food[]>(this.foodListUrl).pipe(
      tap(_ => this.log('fetched foodList'))
    );
  }

  /** GET foods whose name & brand contain search terms */
  searchFoodList(terms: SearchTerms): Observable<Food[]> {
    if (!terms.name.trim() && !terms.brand.trim()) {
      return of([]);
    }
    return this.http.get<Food[]>(`${this.foodListUrl}/?name=${terms.name}&brand=${terms.brand}`).pipe(
      tap (x => x.length ?
        this.log(`found foods matching name=${terms.name} & brand=${terms.brand}`) :
        this.log(`no foods found matching name=${terms.name} & brand=${terms.brand}`))
    );
  }

  /** POST: add a new food to foodList */
  addFood(food: Food): Observable<Food> {
    return this.http.post<Food>(this.foodListUrl, food, this.httpOptions).pipe(
      tap((_) => this.log(`added food w/ name=${food.name} & brand=${food.brand}`))
    );
  }

  /** PUT: update a food in foodList */
  updateFood(food: Food): Observable<Food> {
    return this.http.put<Food>(this.foodListUrl, food, this.httpOptions).pipe(
      tap((_) => this.log(`updated food w/ name=${food.name} & brand=${food.brand}`))
    );
  }

  deleteFood(food: Food): Observable<Food> {
    const url = `${this.foodListUrl}/${food.id}`;

    return this.http.delete<Food>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted food w/ id=${food.id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`FoodService: ${message}`);
  }

}
