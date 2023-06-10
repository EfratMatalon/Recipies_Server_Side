import { TestBed } from '@angular/core/testing';

import { ResponssesService } from './responsses.service';

describe('ResponssesService', () => {
  let service: ResponssesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponssesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
