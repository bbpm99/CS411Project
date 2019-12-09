import { TestBed } from '@angular/core/testing';

import { SaveItineraryService } from './save-itinerary.service';

describe('SaveItineraryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveItineraryService = TestBed.get(SaveItineraryService);
    expect(service).toBeTruthy();
  });
});
