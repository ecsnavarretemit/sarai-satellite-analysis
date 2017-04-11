/*!
 * Earth Engine Service Test
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { TestBed, inject } from '@angular/core/testing';

import { EarthEngineService } from './earth-engine.service';

describe('EarthEngineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EarthEngineService]
    });
  });

  it('should ...', inject([EarthEngineService], (service: EarthEngineService) => {
    expect(service).toBeTruthy();
  }));
});


