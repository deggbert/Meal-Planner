import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { DailyMealPlanService } from 'src/app/core/services/daily-meal-plan.service';

import { Meal } from 'src/app/shared/interfaces/daily-meal-plan.interface';

@Component({
  selector: 'app-pantry',
  templateUrl: './pantry.component.html',
  styleUrls: ['./pantry.component.css']
})
export class PantryComponent implements OnInit {

  breakfastData: Meal[];
  lunchData: Meal[];
  dinnerData: Meal[];

  constructor(
    private route: ActivatedRoute,
    private dailyMealPlanService: DailyMealPlanService
  ) { 
    this.route.data.subscribe((data) => {
      this.breakfastData = data.dailyMealPlan.breakfast;
      this.lunchData = data.dailyMealPlan.lunch;
      this.dinnerData = data.dailyMealPlan.dinner;
    });
  }

  ngOnInit(): void {
  }

}
