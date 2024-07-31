import { TestBed } from '@angular/core/testing';

import { ProductMatrixService } from './product-matrix.service';

describe('ProductMatrixService', () => {
  let service: ProductMatrixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductMatrixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
