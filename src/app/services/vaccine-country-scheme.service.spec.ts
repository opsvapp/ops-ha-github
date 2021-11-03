import { TestBed } from '@angular/core/testing';

import { VaccineCountrySchemeService } from './vaccine-country-scheme.service';

describe('VaccineCountryService', () => {
  let service: VaccineCountrySchemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaccineCountrySchemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
