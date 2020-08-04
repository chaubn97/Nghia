import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketScheduleComponent } from './ticket-schedule.component';

describe('TicketScheduleComponent', () => {
  let component: TicketScheduleComponent;
  let fixture: ComponentFixture<TicketScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
