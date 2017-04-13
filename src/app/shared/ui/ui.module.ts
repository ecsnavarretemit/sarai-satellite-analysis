/*!
 * UI Module
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsiveMediaComponent } from './responsive-media/responsive-media.component';
import { FlatpickerDirective } from './flatpicker.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ResponsiveMediaComponent,
    FlatpickerDirective
  ],
  exports: [
    ResponsiveMediaComponent,
    FlatpickerDirective
  ]
})
export class UiModule { }


