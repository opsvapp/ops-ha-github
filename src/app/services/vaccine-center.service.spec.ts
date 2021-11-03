import { TestBed } from '@angular/core/testing';

import { VaccineCenterService } from './vaccine-center.service';

describe('VaccineCenterService', () => {
  let service: VaccineCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccineCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
