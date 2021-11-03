import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccineCenterPageComponent } from './vaccine-center-page.component';

describe('VaccineCenterPageComponent', () => {
  let component: VaccineCenterPageComponent;
  let fixture: ComponentFixture<VaccineCenterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccineCenterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccineCenterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
