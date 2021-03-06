import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PantryTableComponent } from './pantry-table.component';

describe('PantryTableComponent', () => {
  let component: PantryTableComponent;
  let fixture: ComponentFixture<PantryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PantryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PantryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
