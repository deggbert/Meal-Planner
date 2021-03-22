import { Injectable, NgZone } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { MessageService } from './message.service'; 

import { UserInfo } from 'src/app/shared/interfaces/user-info.interface';

import { UserInfoInit, userInfoConverter } from 'src/app/shared/models/user-info-init.model';
import { UserInfoRoutingModule } from 'src/app/modules/meal-planner/pages/user-info/user-info-routing.module';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  private actionQueue: Promise<void> = new Promise(function(resolve) { resolve() });

  constructor(
    private authService: AuthService,
    private afStore: AngularFirestore,
    private messageService: MessageService,
    private ngZone: NgZone,
  ) { }

  /** GET: get user's info from userInfo collection on firestore server */
  getUserInfo(): Observable<UserInfo> { 
    return this.afStore.collection('userInfo').doc(this.authService.uid).get().pipe(
      map((doc) => {
        return doc.data();
      }),
      tap((_) => this.log('fetched userInfo')),
      catchError(err => {
        console.log(err);
        throw err;
      }),
    );
  }

  saveUserInfo(userInfo: UserInfo): void {
    this.actionQueue.then(() => this._saveUserInfo(userInfo));
  }
  async _saveUserInfo(userInfo: UserInfo): Promise<void> {
    try {
      this.log(`updated User Info **NOT YET SAVED TO SERVER**`);

      await this.afStore.collection('userInfo').doc(this.authService.uid).set(userInfo, {merge: true});
      
      this.log(`User Info SAVED to server`);
      
    } catch(err) {
      console.log(err);
    }
  }

  runCalcs(userInfo: UserInfo): UserInfo {
    this.calcBmr(userInfo);
    this.calcDailyCaloricNeed(userInfo);
    this.calcBodyFatPerc(userInfo);
    this.calcLeanMass(userInfo);
    return (({bmr, dailyCaloricNeed, bodyFatPerc, leanMass}) => ({bmr, dailyCaloricNeed, bodyFatPerc, leanMass}))(userInfo);
  }
  // Mifflin - St Jeor: equation for Basal Metabolic Rate
  calcBmr(userInfo: UserInfo): void {
    if (userInfo.unitSystem && userInfo.sex && userInfo.weight && userInfo.height && userInfo.age) {
      if (userInfo.unitSystem === "Imperial") {
        if (userInfo.sex === "Male" ) {
          userInfo.bmr = Math.round((4.536 * userInfo.weight) + (15.88 * userInfo.height) - (5 * userInfo.age) + 5);
        } else {
          userInfo.bmr = Math.round((4.536 * userInfo.weight) + (15.88 * userInfo.height) - (5 * userInfo.age) - 161);
        }
      } else {
        if (userInfo.sex === "Male" ) {
          userInfo.bmr = Math.round((10 * userInfo.weight) + (6.25 * userInfo.height) - (5 * userInfo.age) + 5);
        } else {
          userInfo.bmr = Math.round((10 * userInfo.weight) + (6.25 * userInfo.height) - (5 * userInfo.age) - 161);
        }
      }
    } else {
      let message: string = ('**CALCULATED-requires: ' + 
        (!userInfo.unitSystem ? 'unit system/' : '') +
        (!userInfo.sex ? 'sex/' : '') +
        (!userInfo.weight ? 'weight/' : '') +
        (!userInfo.height ? 'height/' : '') +
        (!userInfo.age ? 'age' : '')
      ).replace(/\/$/, '') + '**';
      userInfo.bmr = message;
    }
  }

  calcDailyCaloricNeed(userInfo: UserInfo): void {
    if (typeof(userInfo.bmr) === 'number' && userInfo.activityLevel) {
      userInfo.dailyCaloricNeed = +(userInfo.bmr * userInfo.activityLevel).toFixed(1);
    } else {
      let message: string = ('**CALCULATED-requires: ' + 
        (typeof(userInfo.bmr) !== 'number' ? 'bmr/': '') +
        (!userInfo.activityLevel ? 'activity level': '')
      ).replace(/\/$/, '') + '**';
      userInfo.dailyCaloricNeed = message;
    }
  }

  // U.S. Navy Method: equation for Body Fat Percent
  calcBodyFatPerc(userInfo: UserInfo): void {
    if (userInfo.sex === 'Male') {
      if (userInfo.unitSystem && userInfo.height && userInfo.neckCircum && userInfo.waistCircum) {
        if (userInfo.unitSystem === "Imperial") {
          userInfo.bodyFatPerc = +((495 / (1.0324 - 0.19077 * Math.log10((userInfo.waistCircum - userInfo.neckCircum) * 2.54) + 0.15456 * Math.log10(userInfo.height * 2.54))) - 450).toFixed(1);
          // userInfo.bodyFatPerc = +(86.010 * Math.log10(userInfo.waistCircum - userInfo.neckCircum) - 70.041 * Math.log10(userInfo.height) + 36.76).toFixed(1);   ALT IMPERIAL EQUATION
        } else {
          userInfo.bodyFatPerc = +((495 / (1.0324 - 0.19077 * Math.log10(userInfo.waistCircum - userInfo.neckCircum) + 0.15456 * Math.log10(userInfo.height))) - 450).toFixed(1);
        }
      } else {
        let message: string = ('**CALCULATED-requires: ' + 
          (!userInfo.unitSystem ? 'unit system/': '') +
          (!userInfo.height ? 'height/': '') +
          (!userInfo.neckCircum ? 'neck/': '') +
          (!userInfo.waistCircum ? 'waist/': '') 
        ).replace(/\/$/, '') + '**';
        userInfo.bodyFatPerc = message;
      }
    } else {
      if (userInfo.unitSystem && userInfo.height && userInfo.neckCircum && userInfo.waistCircum && userInfo.hipCircum) {
        if (userInfo.unitSystem === "Imperial") {
          userInfo.bodyFatPerc = +((495 / (1.29579 - 0.35004 * Math.log10((userInfo.waistCircum + userInfo.hipCircum - userInfo.neckCircum) * 2.54) + 0.221 * Math.log10(userInfo.height * 2.54))) - 450).toFixed(1);
          // userInfo.bodyFatPerc = +(163.205 * Math.log10(userInfo.waistCircum + userInfo.hipCircum - userInfo.neckCircum) - 97.684 * Math.log10(userInfo.height) - 78.387).toFixed(1);  ALT IMPERIAL EQUATION 
        } else {
          userInfo.bodyFatPerc = +((495 / (1.29579 - 0.35004 * Math.log10(userInfo.waistCircum + userInfo.hipCircum - userInfo.neckCircum) + 0.221 * Math.log10(userInfo.height))) - 450).toFixed(1);
        }
      } else {
        let message: string = ('**CALCULATED-requires: ' + 
          (!userInfo.unitSystem ? 'unit system/': '') +
          (!userInfo.height ? 'height/': '') +
          (!userInfo.neckCircum ? 'neck/': '') +
          (!userInfo.waistCircum ? 'waist/': '') +
          (!userInfo.hipCircum ? 'hip/': '') 
        ).replace(/\/$/, '') + '**';
        userInfo.bodyFatPerc = message;
      }
    }
  }

  calcLeanMass(userInfo: UserInfo): void {
    if (typeof(userInfo.bodyFatPerc) === 'number') {
      userInfo.leanMass = +(userInfo.weight - (userInfo.weight * userInfo.bodyFatPerc / 100)).toFixed(1);
    } else {
      let message: string = '**CALCULATED-requires: body fat percent**';
      userInfo.leanMass = message;
    }
  }

  convertUnits(unitSystems, userInfo: UserInfo): UserInfo {
    let convertedUserInfoInputValues: UserInfo = {};
    if (unitSystems.prevUnitSystem === 'Imperial' && unitSystems.currentUnitSystem === 'Metric') {
      if (userInfo.height) { convertedUserInfoInputValues.height = +(userInfo.height * 2.54).toFixed(1); }
      if (userInfo.weight) { convertedUserInfoInputValues.weight = +(userInfo.weight * 0.453592).toFixed(1); }
      if (userInfo.neckCircum) { convertedUserInfoInputValues.neckCircum = +(userInfo.neckCircum * 2.54).toFixed(1); }
      if (userInfo.waistCircum) { convertedUserInfoInputValues.waistCircum = +(userInfo.waistCircum * 2.54).toFixed(1); }
      if (userInfo.hipCircum) { convertedUserInfoInputValues.hipCircum = +(userInfo.hipCircum * 2.54).toFixed(1); }
    }
    if (unitSystems.prevUnitSystem === 'Metric' && unitSystems.currentUnitSystem === 'Imperial') {
      if (userInfo.height) { convertedUserInfoInputValues.height = +(userInfo.height * 0.393701).toFixed(1); }
      if (userInfo.weight) { convertedUserInfoInputValues.weight = +(userInfo.weight * 2.204620823516057).toFixed(1); }
      if (userInfo.neckCircum) { convertedUserInfoInputValues.neckCircum = +(userInfo.neckCircum * 0.393701).toFixed(1); }
      if (userInfo.waistCircum) { convertedUserInfoInputValues.waistCircum = +(userInfo.waistCircum * 0.393701).toFixed(1); }
      if (userInfo.hipCircum) { convertedUserInfoInputValues.hipCircum = +(userInfo.hipCircum * 0.393701).toFixed(1); }
    }
    return convertedUserInfoInputValues;
  }
  
  private log(message: string) {
    this.messageService.add(`FoodService: ${message}`);
  }
s}
