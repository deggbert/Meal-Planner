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
  
  private foodList$: Observable<Food[]> = null;
  private actionQueues: ActionQueues = {};

  constructor(
    private authService: AuthService,
    private afStore: AngularFirestore,
    private messageService: MessageService,
  ) {
    this.authService.user$.subscribe(user => {
      if (user === null) {
        this.foodList$ = null;
      } 
    });
  }
  
  /** GET: get user's foodList from firestore server */
  getFoodList(): Observable<Food[]> {
    if (!this.foodList$) {
      this.foodList$ = this.afStore.collection<Food>('foodList', ref => ref.where('uid', '==', this.authService.uid)).valueChanges().pipe(
        tap(_ => this.log('fetched foodList')),
        catchError(err => {
          console.log(err);
          throw err; 
        }),
      );
    }
    return this.foodList$;
  }
  

  /** GET: get user's foods from foodList collection on firesore server whose names contain search terms*/
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
        matches.sort((a, b) => {
          if (a.name.match(/\D+/g)[0] === a.name.match(/\D+/g)[0]) {
            return +a.name.match(/\d+/) - +b.name.match(/\d+/)
          }
          return a.name.localeCompare(b.name);
        });
        return matches;
      }),
    );
  }
    
  /** SET: add user's new food to foodList colleciton on firestore server */
  addFood(food: Food): void {
    const autoId: string = this.afStore.collection('foodList').ref.doc().id; 
    
    food.docId = autoId;
    food.uid = this.authService.uid;
    
    food.nameSearchStrings = this.createSearchStrings(food, 'name');
    food.brandSearchStrings = this.createSearchStrings(food, 'brand');
    
    this.actionQueues[food.docId] = { 
      chain: this._addFood(food),
      lastAction: 'add',
    };
    
    // return this.actionQueues[food.docId].chain; //?? Why returning promise?? also why async??
  }
  private async _addFood(food: Food): Promise<void> { 
    try {
      this.log(`ADDED food w/ name=${food.name} & brand=${food.brand} & containerSize=${food.containerSize} **NOT YET SAVED TO SERVER**`);

      await this.afStore.collection('foodList').doc(food.docId).set(food);
      
      this.log(`food w/ name=${food.name} & brand=${food.brand} & containerSize=${food.containerSize} SAVED to server`);
      
    } catch(err) {
      console.log(err);
    }
  }
  
  /** UPDATE: update user's food in foodList collection on firestore server */
  updateFood(food: Food): void {
    const actionQueue = this.actionQueues[food.docId];
    
    if (actionQueue?.lastAction === 'delete') {
      throw new Error("Can't update after delete");
    }

    const newChain = (actionQueue) ? 
      actionQueue.chain.then(() => this._updateFood(food)):
      this._updateFood(food);
    
    this.actionQueues[food.docId] = {
      chain: newChain,
      lastAction: 'update',
    };
    
    // return this.actionQueues[food.docId].chain;
  }
  private async _updateFood(food: Food): Promise<void> {
    try {
      this.log(`UPDATED food w/ name=${food.name} & brand=${food.brand} & containerSize=${food.containerSize} **NOT YET SAVED TO SERVER**`)

      await this.afStore.collection('foodList').doc(food.docId).update(food);
      
      this.log(`food w/ name=${food.name} & brand=${food.brand} & containerSize=${food.containerSize} UPDATED on server`);
      
    } catch(err) {
      console.log(err);
    }
  }

  /** DELETE: delete user's food from foodList collection on firestore server */
  deleteFood(food: Food): void {
    const actionQueue = this.actionQueues[food.docId];
    
    if (actionQueue?.lastAction === 'delete') {
      throw new Error("Can't update after delete");
    }

    const newChain = (actionQueue) ? 
      actionQueue.chain.then(() => this._deleteFood(food)):
      this._deleteFood(food);
    
    this.actionQueues[food.docId] = {
      chain: newChain,
      lastAction: 'delete',
    };
    
    // return this.actionQueues[food.docId].chain;
  }
  private async _deleteFood(food: Food): Promise<void> {
    try {
      this.log(`DELETED food w/ name=${food.name} & brand=${food.brand} & containerSize=${food.containerSize} **NOT YET SAVED TO SERVER**`)

      await this.afStore.collection('foodList').doc(food.docId).delete();
    
      this.log(`food w/ name=${food.name} & brand=${food.brand} & containerSize=${food.containerSize} DELETED from server`);

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