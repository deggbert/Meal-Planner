import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MealPrepTableComponent } from './meal-prep-table.component';

describe('MealPrepTableComponent', () => {
  let component: MealPrepTableComponent;
  let fixture: ComponentFixture<MealPrepTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MealPrepTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealPrepTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
