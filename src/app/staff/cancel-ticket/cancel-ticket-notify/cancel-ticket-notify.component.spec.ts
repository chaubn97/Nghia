import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelTicketNotifyComponent } from './cancel-ticket-notify.component';

describe('CancelTicketNotifyComponent', () => {
  let component: CancelTicketNotifyComponent;
  let fixture: ComponentFixture<CancelTicketNotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelTicketNotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelTicketNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
