import { Component, OnInit, Input } from '@angular/core';

import { UserInfo } from 'src/app/shared/interfaces/user-info.interface';
import { DailyMacroValues } from 'src/app/shared/interfaces/daily-macro-values.interface';


@Component({
  selector: 'app-daily-macros',
  templateUrl: './daily-macros.component.html',
  styleUrls: ['./daily-macros.component.css']
})
export class DailyMacrosComponent implements OnInit {
  @Input() userInfo: UserInfo;

  cutCalories: number;
  dailyCalories: number;

  dailyFatValues: DailyMacroValues = {
    nutrient: 'fat',
    recommended: '15-20%',
    chosen: 0,
    grams: 0,
    calories: 0,
  };
  dailyCarbValues: DailyMacroValues = {
    nutrient: 'carb',
    recommended: 'Remaining Calories',
    chosen: 0,
    grams: 0,
    calories: 0,
  };
  dailyProteinValues: DailyMacroValues = {
    nutrient: 'protein',
    recommended: '0.8-1g per lb. Lean Mass',
    chosen: 0,
    grams: 0,
    calories: 0,
  };

  macroNutrients: DailyMacroValues[] = [
    this.dailyFatValues,
    this.dailyCarbValues,
    this.dailyProteinValues,
  ]

  headers: string[] = [
    'MACRO NUTRIENT',
    'RECOMMENDED DAILY',
    'CHOSEN DAILY',
    'GRAMS',
    'CALORIES',
  ]
  
  constructor() { }

  ngOnInit(): void { }

  calcDailyCalories(): void {
    this.dailyCalories = this.userInfo.dailyCaloricNeed - this.cutCalories;
  }

  calcMacroValues(macro: DailyMacroValues): void {
    if (macro.nutrient === 'fat') {
      macro.calories = +(this.userInfo.dailyCaloricNeed * macro.chosen / 100).toFixed(1);
      macro.grams = +(macro.calories / 9).toFixed(1);
    } else {
      macro.grams = +(this.userInfo.leanMass * macro.chosen).toFixed(1),
      macro.calories = +(macro.grams * 4).toFixed(1);
    }
    if (this.dailyFatValues.chosen !== 0 && this.dailyProteinValues.chosen !== 0) {
      this.dailyCarbValues.calories = +(this.userInfo.dailyCaloricNeed - this.dailyFatValues.calories - this.dailyProteinValues.calories).toFixed(1);
      this.dailyCarbValues.grams = +(this.dailyCarbValues.calories / 4).toFixed(1);
    }
  }
}
