/*!
 * Services Module
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { APIS_PROVIDER } from './api-config.service';
import { EarthEngineService } from './earth-engine.service';
import { LocationsService } from './locations.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ServicesModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        APIS_PROVIDER,
        EarthEngineService,
        LocationsService
      ]
    };
  }

}


