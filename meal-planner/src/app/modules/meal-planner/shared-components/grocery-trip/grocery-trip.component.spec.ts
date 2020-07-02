import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryTripComponent } from './grocery-trip.component';

describe('GroceryTripComponent', () => {
  let component: GroceryTripComponent;
  let fixture: ComponentFixture<GroceryTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
