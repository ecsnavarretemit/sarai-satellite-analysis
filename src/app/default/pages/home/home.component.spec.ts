/*!
 * Home Component Test
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { DebugElement } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ResponsiveMediaComponent, SharedUiModule } from '../../../shared/ui';
import { DefaultFormsModule } from '../../shared/forms';
import { HomeComponent } from './home.component';

import { MOCKED_PROVIDERS, EarthEngineService } from '../../../shared/services';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedUiModule,
        DefaultFormsModule
      ],
      providers: [
        ...MOCKED_PROVIDERS
      ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should process and show images', async(inject([EarthEngineService], (ee: EarthEngineService) => {
    const imageRequest = ee
      .getSatelliteImages('2016-06-01', '2016-07-07')
      .map((res: any) => res.images)
      ;

    // perform the request
    component.processImages(imageRequest);

    // perform change detection
    fixture.detectChanges();

    // query all responsive media component
    const mediaCmps = fixture.debugElement.queryAll(By.directive(ResponsiveMediaComponent));

    component.images.subscribe((images) => {
      // compare the elements length to the fetched images count
      expect(mediaCmps.length).toEqual(images.length);

      expect(component.loaderVisible).toBeFalsy();
    });
  })));

});


