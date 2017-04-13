/*!
 * Earth Engine Service Test
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { async, inject, TestBed } from '@angular/core/testing';
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { APIS_PROVIDER } from '../api-config.service';
import { EarthEngineService } from './earth-engine.service';

describe('EarthEngineService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,

        APIS_PROVIDER,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          }
        },

        EarthEngineService
      ]
    });
  });

  it('should be instantiated', inject([EarthEngineService], (service: EarthEngineService) => {
    expect(service).toBeTruthy();
  }));

  it('should get the processed images',
    async(inject([MockBackend, EarthEngineService], (backend: MockBackend, service: EarthEngineService) => {
      const dataToSend = {
        images: [{
          date: '2016-06-01',
          url: 'http://127.0.0.1:8000/static/earth-engine/eaf1356091f221c2f542809c276b812c06657fdd40593866970a2e96/2016-06-01.jpg'
        }],
        success: true,
        truncated: false
      };

      backend.connections.subscribe((connection: MockConnection) => {
        const options = new ResponseOptions({
          body: JSON.stringify(dataToSend)
        });

        connection.mockRespond(new Response(options));

        expect(connection.request.method).toEqual(RequestMethod.Get);
        expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
      });

      service
        .getSatelliteImages()
        .subscribe((data: any) => {
          expect(data.success).toBe(true);
        })
        ;
    })));

});


