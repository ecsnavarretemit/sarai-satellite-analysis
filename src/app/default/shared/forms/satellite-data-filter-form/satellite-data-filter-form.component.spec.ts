/*!
 * Satellite Data Filter Form Component
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SatelliteDataFilterFormComponent } from './satellite-data-filter-form.component';

describe('SatelliteDataFilterFormComponent', () => {
  let component: SatelliteDataFilterFormComponent;
  let fixture: ComponentFixture<SatelliteDataFilterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatelliteDataFilterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatelliteDataFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


