import { Injectable } from '@angular/core';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { MessageService } from './message.service'; 
import { Food } from '../../shared/interfaces/food.interface';
import { SearchTerms } from '../../shared/interfaces/search-terms.interface';

interface ActionQueues {
  [key: string]: { 
    chain: Promise<any>,
    lastAction: 'add' | 'update' | 'delete';
  }
}

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  constructor(
    private auth: AuthService,
    private afStore: AngularFirestore,
    private messageService: MessageService,
  ) { }

  public foodList$ = new BehaviorSubject<Food[]>([]);
  private actionQueues: ActionQueues = {};

  /** GET foodList from server */
  initializeFoodList(): Observable<void> {
    return this.afStore.collection('foodList', ref => ref.where('uid', '==', this.auth.uid)).get().pipe(
      map(snapshot => {
        this.foodList$.next(snapshot.docs.map(doc => doc.data()));
      }),
      tap( _ => this.log('fetched foodList')),
      catchError(err => {
        console.log(err);
        throw err; 
      }),
    );
  }
  

  /** GET: get foods whose names contain search terms */
  searchFoodList(terms: SearchTerms): Observable<Food[]> {
    if (!terms.name.trim() && !terms.brand.trim()) {
      return of([]);
    }
  
    return this.afStore.collection('foodList', ref => ref.where('uid', '==', this.auth.uid).where('nameSearchStrings', 'array-contains', terms.name)).get().pipe(
      tap(snapshot => snapshot.size ?
        this.log(`found foods matching name=${terms.name}`) :
        this.log(`no foods found matching name=${terms.name}`)),
      map(snapshot => {
        let matches: Food[] = snapshot.docs.map(doc => doc.data());
        return matches;
      }),
    );
  }
    
  /** SET: add a new food to foodList */
  async addFood(food: Food): Promise<void> {
    if (this.actionQueues[food.id]) {
      throw new Error("Can't add food more than once")
    }

    this.actionQueues[food.id] = { 
      chain: this._addFood(food),
      lastAction: 'add',
    }

    return this.actionQueues[food.id].chain;
  }
  private async _addFood(food: Food): Promise<void> {
    try {
      const autoId: string = this.afStore.collection('foodList').ref.doc().id; 
      
      food.docId = autoId;
      food.uid = this.auth.uid;
      
      food.nameSearchStrings = this.createSearchStrings(food, 'name');
      food.brandSearchStrings = this.createSearchStrings(food, 'brand');
      
      await this.afStore.collection('foodList').doc(autoId).set(food);
      
      this.log(`added food w/ name=${food.name} & brand=${food.brand}`);
      
      const newFoodList = [...this.foodList$.value, food];
      this.foodList$.next(newFoodList);
      
    } catch(err) {
      console.log(err);
    }
  }
  
  /** UPDATE: update a food in foodList */
  async updateFood(food: Food): Promise<void> {
    const actionQueue = this.actionQueues[food.id];
    
    if (actionQueue?.lastAction === 'delete') {
      throw new Error("Can't update after delete");
    }

    const newChain = (actionQueue) ? 
      actionQueue.chain.then(() => this._updateFood(food)):
      this._updateFood(food);
    
    this.actionQueues[food.id] = {
      chain: newChain,
      lastAction: 'update',
    }
    
    return this.actionQueues[food.id].chain;
  }
  async _updateFood(food: Food): Promise<void> {
    try {
      await this.afStore.collection('foodList').doc(food.docId).update(food);
      
      const newFoodList = [...this.foodList$.value];
      this.foodList$.next(newFoodList);
      
      this.log(`updated food w/ name=${food.name} & brand=${food.brand}`);
      
    } catch(err) {
      console.log(err);
    }
  }

  /** DELETE: update a food in foodList */
  async deleteFood(food: Food): Promise<void> {
    const actionQueue = this.actionQueues[food.id];
    
    if (actionQueue?.lastAction === 'delete') {
      throw new Error("Can't update after delete");
    }

    const newChain = (actionQueue) ? 
      actionQueue.chain.then(() => this._deleteFood(food)):
      this._deleteFood(food);
    
    this.actionQueues[food.id] = {
      chain: newChain,
      lastAction: 'delete',
    }
    
    return this.actionQueues[food.id].chain;
  }
  async _deleteFood(food: Food): Promise<void> {
    try {
      await this.afStore.collection('foodList').doc(food.docId).delete();
    
      const newFoodList = [...this.foodList$.value];
      this.foodList$.next(newFoodList);
    
      this.log(`deleted food w/ name=${food.name} & brand=${food.brand}`);

    } catch(err) {
      console.log(err);
    }
  }
    
  createSearchStrings (food: Food, field: string): string[] {
    let searchStrings: string[] = [];
    for (let i = 1; i < food[field].length + 1; i++) {
      searchStrings.push(food[field].substring(0, i));
    }
    return searchStrings;
  }
  
  private log(message: string) {
    this.messageService.add(`FoodService: ${message}`);
  }

}
