/*!
 * API Config Service
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { Injectable, InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environment';

export const APIS_CONFIG = new InjectionToken<any>('config.apis');
export const ApisConfig = environment.app.apis;
export const APIS_PROVIDER = { provide: APIS_CONFIG, useValue: ApisConfig };


