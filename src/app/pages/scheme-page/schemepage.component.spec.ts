import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemepageComponent } from './schemepage.component';

describe('SchemepageComponent', () => {
  let component: SchemepageComponent;
  let fixture: ComponentFixture<SchemepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
