import { TestBed } from '@angular/core/testing';

import { IngredientsForRecipyService } from './ingredients-for-recipy.service';

describe('IngredientsForRecipyService', () => {
  let service: IngredientsForRecipyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientsForRecipyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
