/*!
 * Satellite Data Filter Form Component
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

import { FlatpickerDirective } from '../../../../shared/ui';

@Component({
  selector: 'app-satellite-data-filter-form',
  templateUrl: './satellite-data-filter-form.component.html',
  styleUrls: ['./satellite-data-filter-form.component.sass']
})
export class SatelliteDataFilterFormComponent implements OnInit {
  public filterForm: FormGroup;
  public satelliteSel: FormControl;
  public startDateTxt: FormControl;
  public endDateTxt: FormControl;
  public provinceSel: FormControl;
  public imageStyleRad: FormControl;

  @Input('satellites') satellites: any;
  @Input('provinces') provinces: any;
  @Input('imageStyles') imageStyles: any;
  @Output() filter: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('startDatePicker') startDatePicker: FlatpickerDirective;
  @ViewChild('endDatePicker') endDatePicker: FlatpickerDirective;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.satelliteSel = new FormControl('', [
      Validators.required
    ]);

    this.startDateTxt = new FormControl('', [
      Validators.required
    ]);

    this.endDateTxt = new FormControl('', [
      Validators.required
    ]);

    this.provinceSel = new FormControl('', [
      Validators.required
    ]);

    this.imageStyleRad = new FormControl('', [
      Validators.required
    ]);

    this.filterForm = this.fb.group({
      satelliteSel: this.satelliteSel,
      startDateTxt: this.startDateTxt,
      endDateTxt: this.endDateTxt,
      provinceSel: this.provinceSel,
      imageStyleRad: this.imageStyleRad
    });
  }

  onStartDateChange(date: string) {
    const parsedDate = moment(date, 'YYYY-MM-DD');

    // add 1 day to the parsed date
    parsedDate.add(1, 'days');

    // set the minimum date for the end datepicker
    this.endDatePicker.setOption('minDate', parsedDate.toDate());
  }

  processRequest() {
    const values = this.filterForm.value;

    // emit the value to the listener of the component's output
    this.filter.emit({
      satellite: values.satelliteSel,
      startDate: values.startDateTxt,
      endDate: values.endDateTxt,
      province: values.provinceSel,
      imageStyle: values.imageStyleRad
    });
  }

}


