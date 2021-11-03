import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinepageComponent } from './vaccinepage.component';

describe('VaccinepageComponent', () => {
  let component: VaccinepageComponent;
  let fixture: ComponentFixture<VaccinepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaccinepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
