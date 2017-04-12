/*!
 * Earth Engine Service (Mock)
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { Injectable, Inject } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import assign from 'lodash-es/assign';

import { APIS_CONFIG } from '../api-config.service';

@Injectable()
export class EarthEngineService {

  constructor(
    @Inject(APIS_CONFIG) private apisConfig: any,
    private http: Http
  ) { }

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

  getSatelliteImages(options = {}): Observable<any> {
    const resolvedOptions = assign({}, options, {
      province: null,
      satellite: 'landsat-8',
      dimensions: '256x256'
    });

    let queryString = `satellite=${resolvedOptions.satellite}&dimensions=${resolvedOptions.dimensions}`;

    if (resolvedOptions.province !== null) {
      queryString += `&province=${resolvedOptions.province}`;
    }

    // assemble the request headers
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .get(`${this.apisConfig.satellite_images.endpoint}?${queryString}`, {
        headers
      })
      .map((res: Response) => res.json())
      ;
  }

}


