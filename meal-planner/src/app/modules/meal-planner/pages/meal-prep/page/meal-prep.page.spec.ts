import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MealPrepComponent } from './meal-prep.page';

describe('MealPrepComponent', () => {
  let component: MealPrepComponent;
  let fixture: ComponentFixture<MealPrepComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MealPrepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealPrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
