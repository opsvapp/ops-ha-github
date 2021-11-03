import { TestBed } from '@angular/core/testing';

import { TravelVaccineService } from './travel-vaccine.service';

describe('TravelVaccineService', () => {
  let service: TravelVaccineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelVaccineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
