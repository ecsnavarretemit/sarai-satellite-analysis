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
import 'rxjs/add/observable/throw'; // cannot be exported via rxjs-addons file.

import { EarthEngineService, LocationsService } from '../../../shared/services';
import { SatelliteDataFilterFormComponent } from '../../shared/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements AfterViewInit, OnInit {
  public loaderVisible = false;
  public selectedProvince: string = null;
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
    const imagesRequest = Observable
      .of(data)
      .switchMap((formData: any) => {
        if (formData.satellite === 'sentinel-1') {
          return Observable.throw(new Error('Sorry! Sentinel 1 it not yet implemented. Please try again later. Thank you!'));
        }

        return  this.ee.getSatelliteImages(formData.startDate, formData.endDate, {
          province: formData.province,
          satellite: formData.satellite
        });
      })
      .map((res: any) => res.images)
      .map((images: any[]) => {
        // sort images by date
        return images.sort((a, b) => {
          const date1 = moment(a.date, 'YYYY-MM-DD');
          const date2 = moment(b.date, 'YYYY-MM-DD');

          return (date1.toDate() as any) - (date2.toDate() as any);
        });
      })
      .catch((err: any) => {
        // get the name of the satellite
        const selectedSatellite = filter(this.satelliteFilterForm.satellites, ['slug', this.satelliteFilterForm.satelliteSel.value]);
        let alert = {
          id: this.generateRandomChars(),
          type: 'danger',
          timeout: 10000,
          msg: err.message
        };

        if (this.satelliteFilterForm.satelliteSel.value !== 'sentinel-1') {
          const startDate = moment(this.satelliteFilterForm.startDateTxt.value, 'YYYY-MM-DD').format('MMMM D, YYYY');
          const endDate = moment(this.satelliteFilterForm.endDateTxt.value, 'YYYY-MM-DD').format('MMMM D, YYYY');

          alert = {
            id: this.generateRandomChars(),
            type: 'danger',
            timeout: 10000,
            msg: `Data not available for the dates ${startDate} to ${endDate} on ${(selectedSatellite[0] as any).name} satellite.`
          };
        }

        this.alerts.push(alert);

        return Observable.of(null);
      })
      ;

    // set the province
    this.selectedProvince = data.province;

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


