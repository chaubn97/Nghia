import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueScheduleComponent } from './revenue-schedule.component';

describe('RevenueScheduleComponent', () => {
  let component: RevenueScheduleComponent;
  let fixture: ComponentFixture<RevenueScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevenueScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
