import { TestBed } from '@angular/core/testing';

import { SwotanalysisService } from './swotanalysis.service';

describe('SwotanalysisService', () => {
  let service: SwotanalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwotanalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
