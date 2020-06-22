import { Injectable } from '@angular/core';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { AngularFirestore, DocumentSnapshot, DocumentData } from '@angular/fire/firestore';

import { MessageService } from './message.service'; 

import { UserInfo } from 'src/app/shared/interfaces/user-info.interface';
import { ActionQueues } from 'src/app/shared/interfaces/action-queues.interface';

import { UserInfoInit } from 'src/app/shared/models/user-info-init.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  public userInfo$: Observable<UserInfo>;
  private actionQueues: ActionQueues = {};

  constructor(
    private authService: AuthService,
    private afStore: AngularFirestore,
    private messageService: MessageService,
  ) { }

  /** GET: get user info from server */
  initializeUserInfo(): Observable<any> {
    return this.afStore.collection('userInfo').doc(this.authService.uid).get().pipe(
      map((userInfo) => {
        if (!userInfo.exists) {
          let userInfoInit = JSON.parse(JSON.stringify(new UserInfoInit()));
          this.afStore.collection('userInfo').doc(this.authService.uid).set(userInfoInit); //??add a converter? firestore guides [add data -> custom objects]
          return userInfoInit;
        } else {
          return userInfo.data();
        }
      }),
      tap( _ => this.log('fetched userInfo')),
      catchError(err => {
        console.log(err);
        throw err;
      }),
    );
  }

  updateUserInfo(userInfo: UserInfo): Promise<void> {
    debugger;
    return this.afStore.collection('userInfo').doc(this.authService.uid).update(userInfo);
  }
  
    
  // /** SET: add/update a new food to userInfo */
  // async addFood(food: Food): Promise<void> {
  //   const autoId: string = this.afStore.collection('userInfo').ref.doc().id; 
    
  //   food.docId = autoId;

  //   this.actionQueues[food.id] = { 
  //     chain: this._addFood(food),
  //     lastAction: 'add',
  //   };

  //   return this.actionQueues[food.id].chain;
  // }
  // private async _addFood(food: Food): Promise<void> {
  //   try {
  //     // ?? should next 3 lines be in addFood()?
  //     food.uid = this.authService.uid;
      
  //     food.nameSearchStrings = this.createSearchStrings(food, 'name');
  //     food.brandSearchStrings = this.createSearchStrings(food, 'brand');
      
  //     await this.afStore.collection('foodList').doc(food.docId).set(food);
      
  //     this.log(`added food w/ name=${food.name} & brand=${food.brand}`);
      
  //     const newFoodList = [...this.foodList$.value, food];
  //     this.foodList$.next(newFoodList);
      
  //   } catch(err) {
  //     console.log(err);
  //   }
  // }
  
  // /** UPDATE: update a food in foodList */
  // async updateFood(food: Food): Promise<void> {
  //   const actionQueue = this.actionQueues[food.id];
    
  //   if (actionQueue?.lastAction === 'delete') {
  //     throw new Error("Can't update after delete");
  //   }

  //   const newChain = (actionQueue) ? 
  //     actionQueue.chain.then(() => this._updateFood(food)):
  //     this._updateFood(food);
    
  //   this.actionQueues[food.id] = {
  //     chain: newChain,
  //     lastAction: 'update',
  //   };
    
  //   return this.actionQueues[food.id].chain;
  // }
  // async _updateFood(food: Food): Promise<void> {
  //   try {
  //     await this.afStore.collection('foodList').doc(food.docId).update(food);
      
  //     const newFoodList = [...this.foodList$.value];
  //     this.foodList$.next(newFoodList);
      
  //     this.log(`updated food w/ name=${food.name} & brand=${food.brand}`);
      
  //   } catch(err) {
  //     console.log(err);
  //   }
  // }

  // /** DELETE: update a food in foodList */
  // async deleteFood(food: Food): Promise<void> {
  //   const actionQueue = this.actionQueues[food.id];
    
  //   if (actionQueue?.lastAction === 'delete') {
  //     throw new Error("Can't update after delete");
  //   }

  //   const newChain = (actionQueue) ? 
  //     actionQueue.chain.then(() => this._deleteFood(food)):
  //     this._deleteFood(food);
    
  //   this.actionQueues[food.id] = {
  //     chain: newChain,
  //     lastAction: 'delete',
  //   };
    
  //   return this.actionQueues[food.id].chain;
  // }
  // async _deleteFood(food: Food): Promise<void> {
  //   try {
  //     await this.afStore.collection('foodList').doc(food.docId).delete();
    
  //     const newFoodList = [...this.foodList$.value];
  //     this.foodList$.next(newFoodList);
    
  //     this.log(`deleted food w/ name=${food.name} & brand=${food.brand}`);

  //   } catch(err) {
  //     console.log(err);
  //   }
  // }
    
  // createSearchStrings (food: Food, field: string): string[] {
  //   let searchStrings: string[] = [];
  //   for (let i = 1; i < food[field].length + 1; i++) {
  //     searchStrings.push(food[field].substring(0, i));
  //   }
  //   return searchStrings;
  // }
  
  private log(message: string) {
    this.messageService.add(`FoodService: ${message}`);
  }

  isEmptyObject(obj: any): any {
    return (Object.keys(obj).length === 0);
  }
  
}
