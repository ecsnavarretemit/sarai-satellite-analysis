/*!
 * Locations Service
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { Observable } from 'rxjs/Observable';

import { EarthEngineService } from './earth-engine.service';

export class MockEarthEngineService extends EarthEngineService {

  getSatelliteImages(options = {}): Observable<any> {
    return Observable.of({
      images: [{
        date: '2016-06-01',
        url: 'http://127.0.0.1:8000/static/earth-engine/eaf1356091f221c2f542809c276b812c06657fdd40593866970a2e96/2016-06-01.jpg'
      }],
      success: true,
      truncated: false
    });
  }

}


