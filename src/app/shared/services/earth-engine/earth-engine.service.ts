/*!
 * Earth Engine Service (Mock)
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EarthEngineService {

  constructor() { }

  getSatellites(): Observable<any[]> {
    return Observable.of([{
      id: 1,
      name: 'Landsat 8',
      slug: 'landsat-8'
    }, {
      id: 2,
      name: 'Sentinel 1',
      slug: 'sentinel-1'
    }, {
      id: 3,
      name: 'Sentinel 2',
      slug: 'sentinel-2'
    }]);
  }

  getSatelliteStyles(): Observable<any[]> {
    return Observable.of([{
      id: 1,
      name: 'Natural',
      slug: 'natural'
    }, {
      id: 2,
      name: 'NDVI',
      slug: 'ndvi'
    }]);
  }

}


