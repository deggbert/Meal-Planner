import { UserInfo } from 'src/app/shared/interfaces/user-info.interface';

export class UserInfoInit implements UserInfo {
  sex: string = null;
  weight: number = null;
  height: number = null;
  age: number = null;
  bmr: number = null;
  activityLevel: number = null;
  dailyCaloricNeed: number = null;
  neckCircum: number = null;
  waistCircum: number = null;
  hipCircum: number = null;
  bodyFatPerc: number = null;
  leanMass: number = null;
}