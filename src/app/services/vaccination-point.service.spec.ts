import { TestBed } from '@angular/core/testing';

import { VaccinationPointService } from './vaccination-point.service';

describe('VaccinationPointService', () => {
  let service: VaccinationPointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccinationPointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
