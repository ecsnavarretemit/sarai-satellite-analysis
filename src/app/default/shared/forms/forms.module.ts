/*!
 * Forms Module
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as NgFormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedUiModule } from '../../../shared/ui';
import { SatelliteDataFilterFormComponent } from './satellite-data-filter-form/satellite-data-filter-form.component';

@NgModule({
  imports: [
    CommonModule,
    NgFormsModule,
    ReactiveFormsModule,
    SharedUiModule
  ],
  declarations: [
    SatelliteDataFilterFormComponent
  ],
  exports: [
    SatelliteDataFilterFormComponent
  ]
})
export class FormsModule { }


