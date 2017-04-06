/*!
 * Default Module
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesModule } from './pages/pages.module';

@NgModule({
  imports: [
    CommonModule,
    PagesModule
  ],
  declarations: []
})
export class DefaultModule { }


