import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { MessageService } from './message.service'; 

import { UserInfo } from 'src/app/shared/interfaces/user-info.interface';

import { UserInfoInit, userInfoConverter } from 'src/app/shared/models/user-info-init.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private actionQueue: Promise<void> = new Promise(function(resolve) { resolve() });

  constructor(
    private authService: AuthService,
    private afStore: AngularFirestore,
    private messageService: MessageService,
  ) { }

  /** GET: get user's info from userInfo collection on firestore server */
  getUserInfo(): Observable<UserInfo> { 
    return this.afStore.collection('userInfo').doc(this.authService.uid).get().pipe(
      map((userInfo) => {
        if (!userInfo.exists) {
          return this.initializeUserInfo();
        } else {
          return userInfo.data() as UserInfo;
        }
      }),
      tap((_) => this.log('fetched userInfo')),
      catchError(err => {
        console.log(err);
        throw err;
      }),
    );
  }
    
  /** Initialize user's info document in userInfo colleciton if it doesn't yet exist on firestore server */
  initializeUserInfo(): any {
    let userInfoInit = JSON.parse(JSON.stringify(new UserInfoInit())); //??TODO: converter doesn't work b/c it's not part of angularfire --> need a different solution
    this.afStore.collection('userInfo').doc(this.authService.uid).set(userInfoInit);
    return userInfoInit;
  }

  updateUserInfo(userInfo: UserInfo): void {
    this.actionQueue.then(() => this._updateUserInfo(userInfo));
  }
  async _updateUserInfo(userInfo: UserInfo): Promise<void> {
    try {
      this.log(`updated User Info **NOT YET SAVED TO SERVER**`);

      await this.afStore.collection('userInfo').doc(this.authService.uid).update(userInfo);
      
      this.log(`User Info SAVED to server`);
      
    } catch(err) {
      console.log(err);
    }
  }
  
  private log(message: string) {
    this.messageService.add(`FoodService: ${message}`);
  }

  isEmptyObject(obj: any): any {
    return (Object.keys(obj).length === 0);
  }
  
}
