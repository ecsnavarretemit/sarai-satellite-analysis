/*!
 * Shared Module
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedUiModule } from './ui';

@NgModule({
  imports: [
    CommonModule,
    SharedUiModule
  ],
  exports: [
    SharedUiModule
  ]
})
export class SharedModule { }


