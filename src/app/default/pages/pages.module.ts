/*!
 * Pages Module
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared';
import { DefaultSharedModule } from '../shared';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DefaultSharedModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class PagesModule { }


