import { TestBed } from '@angular/core/testing';

import { MarketsearchService } from './marketsearch.service';

describe('MarketsearchService', () => {
  let service: MarketsearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketsearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
