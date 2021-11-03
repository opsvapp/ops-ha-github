import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthCenterPageComponent } from './health-center-page.component';

describe('HealthCenterPageComponent', () => {
  let component: HealthCenterPageComponent;
  let fixture: ComponentFixture<HealthCenterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthCenterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthCenterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
