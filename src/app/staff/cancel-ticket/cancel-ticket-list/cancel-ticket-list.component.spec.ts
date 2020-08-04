import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelTicketListComponent } from './cancel-ticket-list.component';

describe('CancelTicketCancelComponent', () => {
  let component: CancelTicketListComponent;
  let fixture: ComponentFixture<CancelTicketListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelTicketListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
