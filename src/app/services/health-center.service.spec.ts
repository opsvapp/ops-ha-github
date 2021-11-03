import { TestBed } from '@angular/core/testing';

import { HealthCenterService } from './health-center.service';

describe('HealthCenterService', () => {
  let service: HealthCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
