import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FoodTableComponent } from './food-table.component';

describe('FoodTableComponent', () => {
  let component: FoodTableComponent;
  let fixture: ComponentFixture<FoodTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
