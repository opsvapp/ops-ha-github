import { TestBed } from '@angular/core/testing';

import { PermitsService } from './permits.service';

describe('PermitsService', () => {
  let service: PermitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
