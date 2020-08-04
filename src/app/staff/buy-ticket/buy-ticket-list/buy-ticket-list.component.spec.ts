import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyTicketListComponent } from './buy-ticket-list.component';

describe('BuyTicketListComponent', () => {
  let component: BuyTicketListComponent;
  let fixture: ComponentFixture<BuyTicketListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyTicketListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
