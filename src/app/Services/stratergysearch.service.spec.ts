import { TestBed } from '@angular/core/testing';

import { StratergysearchService } from './stratergysearch.service';

describe('StratergysearchService', () => {
  let service: StratergysearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StratergysearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
