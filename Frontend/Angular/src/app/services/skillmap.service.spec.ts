import { TestBed } from '@angular/core/testing';

import { SkillmapService } from './skillmap.service';

describe('SkillmapService', () => {
  let service: SkillmapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillmapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
