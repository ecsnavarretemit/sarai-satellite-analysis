/*!
 * Home Component
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { Component, ElementRef, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { EarthEngineService, LocationsService } from '../../../shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public loaderVisible = false;
  public noticeVisible = true;
  public provinces: Observable<any[]>;
  public satellites: Observable<any[]>;
  public satelliteStyles: Observable<any[]>;

  @ViewChild('imagesRowWrapper') imagesRowWrapper: ElementRef;

  constructor(
    private renderer: Renderer2,
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

  onSatelliteDataFilter(data: any) {
    this.renderer.addClass(this.imagesRowWrapper.nativeElement, 'loading');

    this.noticeVisible = false;
    this.loaderVisible = true;
  }

}


