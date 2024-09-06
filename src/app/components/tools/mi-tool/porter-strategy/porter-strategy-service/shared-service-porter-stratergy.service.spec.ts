import { TestBed } from '@angular/core/testing';

import { SharedServicePorterStratergyService } from './shared-service-porter-stratergy.service';

describe('SharedServicePorterStratergyService', () => {
  let service: SharedServicePorterStratergyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedServicePorterStratergyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
