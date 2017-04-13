/*!
 * Locations Service Test
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { async, inject, TestBed } from '@angular/core/testing';
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { APIS_PROVIDER } from './api-config.service';
import { LocationsService } from './locations.service';

describe('LocationsService', () => {

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

        LocationsService
      ]
    });
  });

  it('should be instantiated', inject([LocationsService], (service: LocationsService) => {
    expect(service).toBeTruthy();
  }));

  it('should get provinces', async(inject([MockBackend, LocationsService], (backend: MockBackend, service: LocationsService) => {
    const dataToSend = {
      result: [{
        'id': 100,
        'name': 'Ilocos Norte',
        'slug': 'ilocos-norte',
      }],
      success: true
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
      .getProvinces()
      .subscribe((data: any) => {
        expect(data.success).toBe(true);
      })
      ;
  })));

});


