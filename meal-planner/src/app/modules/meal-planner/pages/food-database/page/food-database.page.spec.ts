import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDatabaseComponent } from './food-database.page';

describe('FoodDatabaseComponent', () => {
  let component: FoodDatabaseComponent;
  let fixture: ComponentFixture<FoodDatabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodDatabaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
