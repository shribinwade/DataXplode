import { TestBed } from '@angular/core/testing';

import { MiDataService } from './mi-data.service';

describe('MiDataService', () => {
  let service: MiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
