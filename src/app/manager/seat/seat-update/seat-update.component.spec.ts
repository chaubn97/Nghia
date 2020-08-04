import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatUpdateComponent } from './seat-update.component';

describe('SeatUpdateComponent', () => {
  let component: SeatUpdateComponent;
  let fixture: ComponentFixture<SeatUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
