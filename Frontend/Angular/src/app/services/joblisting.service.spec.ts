import { TestBed } from '@angular/core/testing';

import { JoblistingService } from './joblisting.service';

describe('JoblistingService', () => {
  let service: JoblistingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JoblistingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
