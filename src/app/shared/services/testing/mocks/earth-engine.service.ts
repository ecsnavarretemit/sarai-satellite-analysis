/*!
 * Earth Engine Service (Mock)
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { Observable } from 'rxjs/Observable';

import { EarthEngineService } from '../../earth-engine.service';

export class MockEarthEngineService extends EarthEngineService {

  constructor() {
    super(null, null);
  }

  getSatelliteImages(startDate, endDate, options = {}): Observable<any> {
    const images = [{
      date: '2016-06-01',
      url: 'http://localhost:4200/assets/img/test/dummy.png'
    }, {
      date: '2016-06-13',
      url: 'http://localhost:4200/assets/img/test/dummy.png'
    }, {
      date: '2016-06-25',
      url: 'http://localhost:4200/assets/img/test/dummy.png'
    }, {
      date: '2016-07-07',
      url: 'http://localhost:4200/assets/img/test/dummy.png'
    }];

    return Observable.of({
      images,
      success: true,
      truncated: false
    });
  }

}


