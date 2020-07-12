import { TestBed } from '@angular/core/testing';

import { DailyMealPlanService } from './daily-meal-plan.service';

describe('DailMealPlanService', () => {
  let service: DailyMealPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyMealPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
