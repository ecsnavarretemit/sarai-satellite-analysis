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
import { ChoicesDirective } from './choices.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ChoicesDirective,
    FlatpickerDirective,
    ResponsiveMediaComponent,
  ],
  exports: [
    ChoicesDirective,
    FlatpickerDirective,
    ResponsiveMediaComponent,
  ]
})
export class UiModule { }


