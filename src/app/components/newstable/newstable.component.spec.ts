import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewstableComponent } from './newstable.component';

describe('NewstableComponent', () => {
  let component: NewstableComponent;
  let fixture: ComponentFixture<NewstableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewstableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
