/*!
 * Shared Module
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultFormsModule } from './forms';

@NgModule({
  imports: [
    CommonModule,
    DefaultFormsModule
  ],
  exports: [
    DefaultFormsModule
  ]
})
export class SharedModule {}


