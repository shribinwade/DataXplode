import { TestBed } from '@angular/core/testing';

import { MatrixResultService } from './matrix-result.service';

describe('MatrixResultService', () => {
  let service: MatrixResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatrixResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
