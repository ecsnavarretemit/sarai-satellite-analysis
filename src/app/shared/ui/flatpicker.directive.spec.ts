/*!
 * Flatpickr Directive Test
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatpickerDirective } from './flatpicker.directive';

// container component for testing the directive
@Component({
  selector: 'app-container',
  template: `
    <input type="text" class="form-control" placeholder="Select Date" appFlatpicker #datepicker=flatpickr />
  `,
})
export class ContainerComponent {
  @ViewChild('datepicker') datepicker: FlatpickerDirective;
}

describe('FlatpickerDirective', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContainerComponent,
        FlatpickerDirective
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit open event', async(() => {
    component.datepicker.open.subscribe((value: string) => {
      expect(value).toBe('');
    });

    component.datepicker.showPicker();
  }));

  it('should emit change event', async(() => {
    const dateStr = '2017-01-04';

    component.datepicker.dateChange.subscribe((value: string) => {
      expect(value).toBe(dateStr);
    });

    // the second argument is not documented but it means if we need to fire change event or not.
    // definitely we need to explicitly set second argument to true if we want to check if our
    // event emitter works.
    component.datepicker.pluginInstance.setDate(dateStr);
  }));

  it('should emit close event', async(() => {
    component.datepicker.close.subscribe((value: string) => {
      expect(value).toBe('');
    });

    component.datepicker.hidePicker();
  }));

});


