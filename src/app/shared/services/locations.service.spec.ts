/*!
 * Locations Service Test
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { TestBed, inject } from '@angular/core/testing';

import { LocationsService } from './locations.service';

describe('LocationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationsService]
    });
  });

  it('should ...', inject([LocationsService], (service: LocationsService) => {
    expect(service).toBeTruthy();
  }));
});


