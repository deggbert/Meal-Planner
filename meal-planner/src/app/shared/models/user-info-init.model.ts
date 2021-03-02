import { UserInfo } from 'src/app/shared/interfaces/user-info.interface';
import { ActivatedRouteSnapshot } from '@angular/router';

export class UserInfoInit implements UserInfo {
  unitSystem: string = null;
  sex: string = null;
  weight: number = 1;
  height: number = 1;
  age: number = 1;
  bmr: number = null;
  activityLevel: number = null;
  dailyCaloricNeed: number = null;
  neckCircum: number = 1;
  waistCircum: number = 1;
  hipCircum: number = 1;
  bodyFatPerc: number = null;
  leanMass: number = null;
}

export let userInfoConverter = {
  toFirestore: function(userInfo: UserInfo) {
    return {
      sex: userInfo.sex,
      weight: userInfo.weight,
      height: userInfo.height,
      age: userInfo.age,
      bmr: userInfo.bmr,
      activityLevel: userInfo.activityLevel,
      dailyCaloricNeed: userInfo.dailyCaloricNeed,
      neckCircum: userInfo.neckCircum,
      waistCircum: userInfo.waistCircum,
      bodyFatPerc: userInfo.bodyFatPerc,
      leanMass: userInfo.leanMass,
    }
  },
  fromFirestore: function(snapshot, options) {
    const data = snapshot.data(options);
    return new UserInfoInit();
  }
}
