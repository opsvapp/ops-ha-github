import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpointPageComponent } from './vpoint-page.component';

describe('VpointPageComponent', () => {
  let component: VpointPageComponent;
  let fixture: ComponentFixture<VpointPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpointPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VpointPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
