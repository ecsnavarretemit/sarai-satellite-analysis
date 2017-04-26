/*!
 * App Module
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap/alert';

import { AppRoutingModule } from './app-routing.module';
import { DefaultModule } from './default';
import { ServicesModule } from './shared';
import { AppComponent } from './app.component';

// rxjs operators and observables addons
import './rxjs-addons';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    AppRoutingModule,
    ServicesModule.forRoot(),
    DefaultModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


