import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseasepageComponent } from './diseasepage.component';

describe('DiseasepageComponent', () => {
  let component: DiseasepageComponent;
  let fixture: ComponentFixture<DiseasepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseasepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseasepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
