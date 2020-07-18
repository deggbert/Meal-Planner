import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyMealPlanTableComponent } from './daily-meal-plan-table.component';

describe('DailyMealPlanTableComponent', () => {
  let component: DailyMealPlanTableComponent;
  let fixture: ComponentFixture<DailyMealPlanTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyMealPlanTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyMealPlanTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
