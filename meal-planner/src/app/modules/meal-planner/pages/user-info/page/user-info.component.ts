import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { tap } from 'rxjs/operators';

import { UserInfoService } from 'src/app/core/services/user-info.service';

import { UserInfo } from 'src/app/shared/interfaces/user-info.interface';

// ?? Is this useful for table?
// ?? TODO: using to get values from object ... maybe enum with fields (i.e. activity level) and numbers and then grab values from array at index
enum UserInfoHeaders {
  'Sex:' = 'sex',
  'Weight (lbs):' = 'weight',
  'Height (inches):' = 'height',
  'Age (years):' = 'age',
  'BMR:' = 'bmr',
  'Activity Level:' = 'activityLevel',
  'Daily Caloric Need:' = 'dailyCaloricNeed',
  'Neck Circumference (inches):' = 'neckCircum',
  'Waist Circumference (inches):' = 'waistCircum',
  'Hip Circumference (inches):' = 'hipCircum',
  'Body Fat Percent (%):' = 'bodyFatPerc',
  'Lean Mass (lbs):' = 'leanMass',
}

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  
  isEdit: boolean = false;
  isUpdated: boolean = false;
  userInfo: UserInfo = {}; //??TODO: use a resolver to get data before ---> resolver doesn't work with angularfiredocument = need to find alt solution
  tempUserInfo: UserInfo;
  
  headers: string[] = [
    'Sex:',
    'Weight (lbs):',
    'Height (inches):',
    'Age (years):',
    'BMR:',
    'Activity Level:',
    'Daily Caloric Need:',
    'Neck Circumference (inches):',
    'Waist Circumference (inches):',
    'Hip Circumference (inches):',
    'Body Fat Percent (%):',
    'Lean Mass (lbs):',
  ]

  // TODO?: maybe should have sex as part of user login?? so that the user input form can't be toggled ***** NEED TO DO THIS  
  // TODO?: maybe should have a component for male and female and use ngSwitch to make the page appropriate for each sex

  activityLevels: [string, string][] = [
    ["Sedentary (little or no excerise)", "1.2"],
    ["Light (20 mins 1-3 days/week)", "1.375"],
    ["Moderate (30 mins 3-5 days/week)", "1.55"],
    ["Heavy (60 mins 5-7 days/week)", "1.725"],
    ["Extreme (60 mins 2x/day)", "1.9"]
  ]

  constructor(
    private route: ActivatedRoute,
    private userInfoService: UserInfoService,
  ) {
    this.route.data.subscribe((data) => {
      this.userInfo = data.userInfo;
    });
   }

  ngOnInit(): void { }


  updateUserInfo(): void {
    this.userInfoService.updateUserInfo(this.userInfo);
    this.isEdit = false;
    this.isUpdated = true;
  }

  toggleEdit(): void {
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      this.tempUserInfo = Object.assign({}, this.userInfo);
    }
    if (!this.isEdit) {
      this.isUpdated = false;
    }
    if (!this.isEdit && !this.isUpdated) {
      this.userInfo = this.tempUserInfo;
    }
    if (this.userInfo.sex === 'male') {
      this.userInfo.hipCircum = null;
    }
  }

  // Mifflin - St Jeor: equation for Basal Metabolic Rate
  calcBmr(): void { // ?? doesn't error if values are not a string - b/c value set to null
    if (this.userInfo?.sex && this.userInfo.weight && this.userInfo.height && this.userInfo.age) {  // ?? is it better to use ! and ||
      if (this.userInfo?.sex === "male" ) {
        this.userInfo.bmr = Math.round((4.536 * this.userInfo.weight) + (15.88 * this.userInfo.height) - (5 * this.userInfo.age) + 5);
      } else {
        this.userInfo.bmr = Math.round((4.536 * this.userInfo.weight) + (15.88 * this.userInfo.height) - (5 * this.userInfo.age) - 161);
      }
    }
  }

  calcDailyCaloricNeed(): void {
    if (this.userInfo.bmr && this.userInfo.activityLevel) {
      this.userInfo.dailyCaloricNeed = this.userInfo.bmr * this.userInfo.activityLevel;
    }
  }

  // u.S. Navy Method: equation for Body Fat Percent
  calcBodyFatPerc(): void {
    if (this.userInfo?.sex === 'male') {
      if (this.userInfo.neckCircum && this.userInfo.waistCircum) {
        this.userInfo.bodyFatPerc = +(86.010 * Math.log10(this.userInfo.waistCircum - this.userInfo.neckCircum) - 70.041 * Math.log10(this.userInfo.height) + 36.76).toFixed(1);
        this.calcLeanMass();
      }
    } else {
      if (this.userInfo.height && this.userInfo.neckCircum && this.userInfo.waistCircum && this.userInfo.hipCircum) {
        this.userInfo.bodyFatPerc = +(163.205 * Math.log10(this.userInfo.waistCircum + this.userInfo.hipCircum - this.userInfo.neckCircum) - 97.684 * Math.log10(this.userInfo.height) - 78.387).toFixed(1);
        this.calcLeanMass();
      }
    }
  }

  calcLeanMass(): void {
    this.userInfo.leanMass = +(this.userInfo.weight - (this.userInfo.weight * this.userInfo.bodyFatPerc / 100)).toFixed(1);
  }

  isEmptyObject(obj: any): any {
    return (Object.keys(obj).length === 0);
  }
  
  originalOrder = (a, b): number => {
    return 0;
  }
  
  getObjectValues(userInfo: UserInfo) {
    let values: (string | number)[] = [];
    for (let header of this.headers) {
      let value = userInfo[UserInfoHeaders[header]];
      if (typeof value === 'string') {
        value = value[0].toUpperCase() + value.slice(1);
      }
      if (!value) {
        value = 'N/A';
      }
      values.push(value);
    }
    return values;
  }
}
