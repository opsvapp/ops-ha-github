import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectspageComponent } from './effectspage.component';

describe('EffectspageComponent', () => {
  let component: EffectspageComponent;
  let fixture: ComponentFixture<EffectspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EffectspageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EffectspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
