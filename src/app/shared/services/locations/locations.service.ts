/*!
 * Locations Service
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { Injectable, Inject } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { APIS_CONFIG } from '../api-config.service';

@Injectable()
export class LocationsService {

  constructor(
    @Inject(APIS_CONFIG) private apisConfig: any,
    private http: Http,
  ) { }

  getProvinces(): Observable<any> {
    // assemble the request headers
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .get(this.apisConfig.locations.provinces.endpoint, {
        headers
      })
      .map((res: Response) => res.json())
      ;
  }

}


