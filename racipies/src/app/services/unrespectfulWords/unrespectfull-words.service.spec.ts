import { TestBed } from '@angular/core/testing';

import { UnrespectfullWordsService } from './unrespectfull-words.service';

describe('UnrespectfullWordsService', () => {
  let service: UnrespectfullWordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnrespectfullWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
