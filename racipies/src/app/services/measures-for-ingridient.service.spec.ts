import { TestBed } from '@angular/core/testing';

import { MeasuresForIngridientService } from './measures-for-ingridient.service';

describe('MeasuresForIngridientService', () => {
  let service: MeasuresForIngridientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeasuresForIngridientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
