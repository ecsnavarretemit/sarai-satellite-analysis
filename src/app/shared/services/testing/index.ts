/*!
 * Test Exporter
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { EarthEngineService } from '../earth-engine.service';
import { LocationsService } from '../locations.service';
import { MockEarthEngineService, MockLocationsService } from './mocks';

export * from './mocks';

export const MOCKED_PROVIDERS = [
  { provide: EarthEngineService, useClass: MockEarthEngineService },
  { provide: LocationsService, useClass: MockLocationsService }
];



