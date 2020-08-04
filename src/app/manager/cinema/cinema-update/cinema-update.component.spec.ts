import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaUpdateComponent } from './cinema-update.component';

describe('CinemaUpdateComponent', () => {
  let component: CinemaUpdateComponent;
  let fixture: ComponentFixture<CinemaUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinemaUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
