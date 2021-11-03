import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelVaccineComponent } from './travel-vaccine.component';

describe('TravelVaccineComponent', () => {
  let component: TravelVaccineComponent;
  let fixture: ComponentFixture<TravelVaccineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelVaccineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelVaccineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
