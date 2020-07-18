import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyMacrosComponent } from './daily-macros.component';

describe('DailyCaloriesComponent', () => {
  let component: DailyMacrosComponent;
  let fixture: ComponentFixture<DailyMacrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyMacrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyMacrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
