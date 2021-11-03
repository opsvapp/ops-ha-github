import { TestBed } from '@angular/core/testing';

import { EmittersService } from './emitters.service';

describe('EmittersService', () => {
  let service: EmittersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmittersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
