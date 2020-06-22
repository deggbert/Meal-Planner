import { Component, OnInit } from '@angular/core';

import { UserInfoService } from 'src/app/core/services/user-info.service';

import { UserInfo } from 'src/app/shared/interfaces/user-info.interface';
import { ActionQueues } from 'src/app/shared/interfaces/action-queues.interface';

import { UserInfoInit } from 'src/app/shared/models/user-info-init.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  
  isEdit: boolean;
  userInfo: UserInfo = {};  //??TODO: use a resolver to get data before --- could solve problems
  
  // TODO?: maybe should have sex as part of user login?? so that the user input form can't be toggled
  // TODO?: maybe should have a component for male and female and use ngSwitch to make the page appropriate for each sex
  // userInfo: UserInfo = {
  //   sex: "male",
  //   weight: 153.8,
  //   height: 72,
  //   age: 26,
  //   neckCircum: 13.5,
  //   waistCircum: 31.5,
  // };

  activityLevels: [string, string][] = [
    ["Sedentary (little or no excerise)", "1.2"],
    ["Light (20 mins 1-3 days/week)", "1.375"],
    ["Moderate (30 mins 3-5 days/week)", "1.55"],
    ["Heavy (60 mins 5-7 days/week)", "1.725"],
    ["Extreme (60 mins 2x/day)", "1.9"]
  ]

  constructor(
    private userInfoService: UserInfoService,
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.userInfoService.initializeUserInfo().subscribe((userInfo) => {
      this.userInfo = userInfo;
    });  
  }

  updateUserInfo(): void {
    this.userInfoService.updateUserInfo(this.userInfo);
  }

  toggleEdit(): void {
    this.isEdit = !this.isEdit;
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

}
