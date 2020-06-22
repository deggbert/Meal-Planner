import { Injectable } from '@angular/core';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { MessageService } from './message.service'; 

import { Food } from '../../shared/interfaces/food.interface';
import { ActionQueues } from 'src/app/shared/interfaces/action-queues.interface';
import { SearchTerms } from '../../shared/interfaces/search-terms.interface';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  
public foodList$: BehaviorSubject<Food[]> = new BehaviorSubject<Food[]>([]);  // TODO: probably should be using valuechanges() or snapshotchanges()
  private actionQueues: ActionQueues = {};

  constructor(
    private authService: AuthService,
    private afStore: AngularFirestore,
    private messageService: MessageService,
  ) { }
  
  /** GET: get foodList from server */
  initializeFoodList(): Observable<void> {
    return this.afStore.collection('foodList', ref => ref.where('uid', '==', this.authService.uid)).get().pipe(
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
  
    return this.afStore.collection('foodList', ref => ref.where('uid', '==', this.authService.uid).where('nameSearchStrings', 'array-contains', terms.name)).get().pipe(
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
    const autoId: string = this.afStore.collection('foodList').ref.doc().id; 
    
    food.docId = autoId;

    this.actionQueues[food.id] = { 
      chain: this._addFood(food),
      lastAction: 'add',
    };

    return this.actionQueues[food.id].chain;
  }
  private async _addFood(food: Food): Promise<void> {
    try {
      // ?? should next 3 lines be in addFood()?
      food.uid = this.authService.uid;
      
      food.nameSearchStrings = this.createSearchStrings(food, 'name');
      food.brandSearchStrings = this.createSearchStrings(food, 'brand');
      
      this.log(`added food w/ name=${food.name} & brand=${food.brand}`); //TODO: add messages for local save and server save before and after awaits

      await this.afStore.collection('foodList').doc(food.docId).set(food);
      
      this.log(`SAVED food w/ name=${food.name} & brand=${food.brand}`);
      
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
    };
    
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

  /** DELETE: delete a food in foodList */
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
    };
    
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
