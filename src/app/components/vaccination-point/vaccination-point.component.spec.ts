import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationPointComponent } from './vaccination-point.component';

describe('VaccinationPointComponent', () => {
  let component: VaccinationPointComponent;
  let fixture: ComponentFixture<VaccinationPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinationPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinationPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
