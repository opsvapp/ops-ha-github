import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineCountryPageComponent } from './vaccine-country-page.component';

describe('VaccineCountryPageComponent', () => {
  let component: VaccineCountryPageComponent;
  let fixture: ComponentFixture<VaccineCountryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineCountryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineCountryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
