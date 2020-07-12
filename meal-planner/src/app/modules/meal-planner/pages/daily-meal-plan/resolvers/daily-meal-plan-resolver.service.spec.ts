import { TestBed } from '@angular/core/testing';

import { DailyMealPlanResolverService } from './daily-meal-plan-resolver.service';

describe('DailyMealPlanResolverService', () => {
  let service: DailyMealPlanResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyMealPlanResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
