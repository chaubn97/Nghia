import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyTicketScheduleComponent } from './buy-ticket-schedule.component';

describe('BuyTicketScheduleComponent', () => {
  let component: BuyTicketScheduleComponent;
  let fixture: ComponentFixture<BuyTicketScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyTicketScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyTicketScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
