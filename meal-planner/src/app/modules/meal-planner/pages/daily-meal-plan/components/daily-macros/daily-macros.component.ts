import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UserInfo } from 'src/app/shared/interfaces/user-info.interface';
import { DailyMacros, DailyMacroValues } from 'src/app/shared/interfaces/daily-macros.interface';

@Component({
  selector: 'app-daily-macros',
  templateUrl: './daily-macros.component.html',
  styleUrls: ['./daily-macros.component.css']
})
export class DailyMacrosComponent implements OnInit {
  @Input() userInfo: UserInfo;
  @Input() cutCalories: number;
  @Input() fatChosen: number;
  @Input() proteinChosen: number;

  @Output() setCutCaloriesEvent = new EventEmitter<number>();
  @Output() setDailyMacros = new EventEmitter<DailyMacros>();
  
  dailyCalories: number;

  dailyFatValues: DailyMacroValues = {
    nutrient: 'fat',
    recommended: '15-20%',
    chosen: null,
    grams: null,
    calories: null,
  };
  dailyCarbValues: DailyMacroValues = {
    nutrient: 'carb',
    recommended: 'Remaining Calories',
    chosen: null,
    grams: null,
    calories: null,
  };
  dailyProteinValues: DailyMacroValues = {
    nutrient: 'protein',
    recommended: '0.8-1g per lb. Lean Mass',
    chosen: null,
    grams: null,
    calories: null,
  };

  dailyMacros = {
    fat: this.dailyFatValues,
    carb: this.dailyCarbValues,
    protein: this.dailyProteinValues,
  }
  

  headers: string[] = [
    'MACRO NUTRIENT',
    'RECOMMENDED DAILY',
    'CHOSEN DAILY',
    'GRAMS',
    'CALORIES',
  ]
  
  constructor() { 
  }
  
  ngOnInit(): void { 
    this.dailyFatValues.chosen = this.fatChosen;
    this.dailyProteinValues.chosen = this.proteinChosen;
    this.calcDailyCalories();
    this.calcMacroValues(this.dailyFatValues);
    this.calcMacroValues(this.dailyProteinValues);
  }

  calcDailyCalories(): void {
    this.dailyCalories = +(this.userInfo.dailyCaloricNeed - this.cutCalories).toFixed(0);
    this.setCutCaloriesEvent.emit(this.cutCalories);
  }

  calcMacroValues(macro: DailyMacroValues): void {
    if (macro.nutrient === 'fat') {
      macro.calories = +(this.dailyCalories * macro.chosen / 100).toFixed(0);
      macro.grams = +(macro.calories / 9).toFixed(1);
    } else {
      macro.grams = +(this.userInfo.leanMass * macro.chosen).toFixed(1),
      macro.calories = +(macro.grams * 4).toFixed(0);
    }
    
    if (this.dailyFatValues.chosen !== 0 && this.dailyProteinValues.chosen !== 0) {
      this.dailyCarbValues.calories = +(this.dailyCalories - this.dailyFatValues.calories - this.dailyProteinValues.calories).toFixed(0);
      this.dailyCarbValues.grams = +(this.dailyCarbValues.calories / 4).toFixed(1);
    }
    this.setDailyMacros.emit(this.dailyMacros);
  }

  originalOrder = (a:any, b:any): number => {
    return 0;
  }
}
