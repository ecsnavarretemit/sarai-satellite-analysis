/*!
 * UI Module
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsiveMediaComponent } from './responsive-media/responsive-media.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ResponsiveMediaComponent
  ],
  exports: [
    ResponsiveMediaComponent
  ]
})
export class UiModule { }


