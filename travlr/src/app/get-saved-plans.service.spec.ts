import { TestBed } from '@angular/core/testing';

import { GetSavedPlansService } from './get-saved-plans.service';

describe('GetSavedPlansService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetSavedPlansService = TestBed.get(GetSavedPlansService);
    expect(service).toBeTruthy();
  });
});
