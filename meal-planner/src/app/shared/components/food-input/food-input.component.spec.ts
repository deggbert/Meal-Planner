import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FoodInputComponent } from './food-input.component';

describe('FoodInputComponent', () => {
  let component: FoodInputComponent;
  let fixture: ComponentFixture<FoodInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
