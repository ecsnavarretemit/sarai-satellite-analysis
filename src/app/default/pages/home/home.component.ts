/*!
 * Home Component
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import filter from 'lodash-es/filter';
import reject from 'lodash-es/reject';

import { EarthEngineService, LocationsService } from '../../../shared/services';
import { SatelliteDataFilterFormComponent } from '../../shared/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements AfterViewInit, OnInit {
  public loaderVisible = false;
  public images: Observable<any[]>;
  public provinces: Observable<any[]>;
  public satellites: Observable<any[]>;
  public satelliteStyles: Observable<any[]>;
  public alerts = [];

  @ViewChild(SatelliteDataFilterFormComponent) satelliteFilterForm: SatelliteDataFilterFormComponent;

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

  ngAfterViewInit() {
    // set the satellite image style default value to ndvi
    this.satelliteFilterForm.imageStyleRad.setValue('ndvi');
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
      .catch((err: any) => {
        const startDate = moment(this.satelliteFilterForm.startDateTxt.value, 'YYYY-MM-DD').format('MMMM D, YYYY');
        const endDate = moment(this.satelliteFilterForm.endDateTxt.value, 'YYYY-MM-DD').format('MMMM D, YYYY');

        // get the name of the satellite
        const selectedSatellite = filter(this.satelliteFilterForm.satellites, ['slug', this.satelliteFilterForm.satelliteSel.value]);

        this.alerts.push({
          id: this.generateRandomChars(),
          type: 'danger',
          timeout: 10000,
          msg: `Data not available for the dates ${startDate} to ${endDate} on ${(selectedSatellite[0] as any).name} satellite.`
        });

        return Observable.of(null);
      })
      ;

    this.processImages(imagesRequest);
  }

  onAlertClose(id) {
    // remove the message from the list of alerts
    this.alerts = reject(this.alerts, ['id', id]);
  }

  generateRandomChars() {
    return Math.random().toString(36).substring(7);
  }

}


