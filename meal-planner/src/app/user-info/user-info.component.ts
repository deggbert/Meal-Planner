import { Component, OnInit } from '@angular/core';

import { User } from '../user-interface';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }
  
  // TODO?: maybe should have sex as part of user login?? so that the user input form can't be toggled
  // TODO?: maybe should have a component for male and famle and use ngSwitch to make the page appropriate for each sex
  user: User = {
    sex: "male",
    weight: 153.8,
    height: 72,
    age: 26,
    neckCircum: 13.5,
    waistCircum: 31.5,
  };

  activityLevels: [string, string][] = [
    ["Sedentary (little or no excerise)", "1.2"],
    ["Light (20 mins 1-3 days/week)", "1.375"],
    ["Moderate (30 mins 3-5 days/week)", "1.55"],
    ["Heavy (60 mins 5-7 days/week)", "1.725"],
    ["Extreme (60 mins 2x/day)", "1.9"]
  ]

  constructor() { }

  ngOnInit(): void {
  }

  // Mifflin - St Jeor: equation for Basal Metabolic Rate
  calcBmr(): void { // ?? doesn't error if values are not a string - b/c value set to null
    if (this.user.sex && this.user.weight && this.user.height && this.user.age) {  // ?? is it better to use ! and ||
      if (this.user.sex == "male" ) {
        this.user.bmr = Math.round((4.536 * this.user.weight) + (15.88 * this.user.height) - (5 * this.user.age) + 5);
      } else {
        this.user.bmr = Math.round((4.536 * this.user.weight) + (15.88 * this.user.height) - (5 * this.user.age) - 161);
      }
    }
  }

  calcDailyCaloricNeed(): void {
    if (this.user.bmr && this.user.activityLevel) {
      this.user.dailyCaloricNeed = this.user.bmr * this.user.activityLevel;
    }
  }

  // u.S. Navy Method: equation for Body Fat Percent
  calcBodyFatPerc(): void {
    if (this.user.sex === 'male') {
      if (this.user.neckCircum && this.user.waistCircum) {
        this.user.bodyFatPerc = +(86.010 * Math.log10(this.user.waistCircum - this.user.neckCircum) - 70.041 * Math.log10(this.user.height) + 36.76).toFixed(1);
        this.calcLeanMass();
      }
    } else {
      if (this.user.height && this.user.neckCircum && this.user.waistCircum && this.user.hipCircum) {
        this.user.bodyFatPerc = +(163.205 * Math.log10(this.user.waistCircum + this.user.hipCircum - this.user.neckCircum) - 97.684 * Math.log10(this.user.height) - 78.387).toFixed(1);
        this.calcLeanMass();
      }
    }
  }

  calcLeanMass(): void {
    this.user.leanMass = +(this.user.weight - (this.user.weight * this.user.bodyFatPerc / 100)).toFixed(1);
  }

}
