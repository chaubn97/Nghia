import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaDeleteComponent } from './cinema-delete.component';

describe('CinemaDeleteComponent', () => {
  let component: CinemaDeleteComponent;
  let fixture: ComponentFixture<CinemaDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinemaDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
