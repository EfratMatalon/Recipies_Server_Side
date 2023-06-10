import { TestBed } from '@angular/core/testing';

import { RecomendsIngredientsService } from './recomends-ingredients.service';

describe('RecomendsIngredientsService', () => {
  let service: RecomendsIngredientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecomendsIngredientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
