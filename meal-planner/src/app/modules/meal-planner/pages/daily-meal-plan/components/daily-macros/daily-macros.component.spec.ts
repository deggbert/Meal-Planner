import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DailyMacrosComponent } from './daily-macros.component';

describe('DailyCaloriesComponent', () => {
  let component: DailyMacrosComponent;
  let fixture: ComponentFixture<DailyMacrosComponent>;

  beforeEach(waitForAsync(() => {
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
