/*!
 * Locations Service (Mock)
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { Observable } from 'rxjs/Observable';

import { LocationsService } from '../../locations.service';

export class MockLocationsService extends LocationsService {

  constructor() {
    super(null, null);
  }

  getProvinces(): Observable<any> {
    return Observable.of({
      result: [
        {
          id: 100,
          name: 'Ilocos Region',
          region_normalized: 'Region 1',
          region_normalized_canonical: 'Ilocos Region (Region 1)',
          region_roman: 'Region I',
          region_roman_canonical: 'Ilocos Region (Region I)',
          slug: 'ilocos-region-region-i'
        }
      ],
      success: true
    });
  }

}


