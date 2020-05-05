import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealPrepComponent } from './meal-prep.component';

describe('MealPrepComponent', () => {
  let component: MealPrepComponent;
  let fixture: ComponentFixture<MealPrepComponent>;

  beforeEach(async(() => {
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
