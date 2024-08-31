import { TestBed } from '@angular/core/testing';

import { PorterService } from './porter.service';

describe('PorterService', () => {
  let service: PorterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PorterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
