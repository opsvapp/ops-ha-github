import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineCountryComponent } from './vaccine-country.component';

describe('VaccineCountryComponent', () => {
  let component: VaccineCountryComponent;
  let fixture: ComponentFixture<VaccineCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
