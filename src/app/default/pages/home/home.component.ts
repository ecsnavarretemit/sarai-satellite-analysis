/*!
 * Home Component
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { EarthEngineService, LocationsService } from '../../../shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public loaderVisible = false;
  public images: Observable<any[]>;
  public provinces: Observable<any[]>;
  public satellites: Observable<any[]>;
  public satelliteStyles: Observable<any[]>;

  constructor(
    private ee: EarthEngineService,
    private locations: LocationsService
  ) { }

  ngOnInit() {
    this.satellites = this.ee.getSatellites();
    this.satelliteStyles = this.ee.getSatelliteStyles();

    this.provinces = this.locations
      .getProvinces()
      .map((res: any) => res.result)
      ;
  }

  processImages(imagesRequest: Observable<any>) {
    this.loaderVisible = true;

    // multicast the result of this observable to prevent double subscription.
    this.images = imagesRequest
      .do(() => {
        // remove loading screen when processing of images are finished
        this.loaderVisible = false;
      })
      .share()
      ;
  }

  onSatelliteDataFilter(data: any) {
    const imagesRequest = this.ee
      .getSatelliteImages(data.startDate, data.endDate, {
        province: data.province,
        satellite: data.satellite
      })
      .map((res: any) => res.images)
      ;

    this.processImages(imagesRequest);
  }

}


