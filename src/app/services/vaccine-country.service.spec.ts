import { TestBed } from '@angular/core/testing';

import { VaccineCountryService } from './vaccine-country.service';

describe('VaccineCountryService', () => {
  let service: VaccineCountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccineCountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
