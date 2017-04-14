/*!
 * Flatpickr Directive
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { AfterViewInit, Directive, ElementRef, forwardRef, EventEmitter, Input, OnInit, OnDestroy, Output, Renderer2 } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as Flatpickr from 'flatpickr';
import * as moment from 'moment';
import assign from 'lodash-es/assign';
import padStart from 'lodash-es/padStart';

@Directive({
  selector: '[appFlatpicker]',
  exportAs: 'flatpickr',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FlatpickerDirective),
    multi: true
  }]
})
export class FlatpickerDirective implements AfterViewInit, ControlValueAccessor, OnDestroy, OnInit {
  @Input('fpOptions') fpOptions: any = {};
  @Output('close') close: EventEmitter<string> = new EventEmitter<string>();
  @Output('dateChange') dateChange: EventEmitter<string> = new EventEmitter<string>();
  @Output('open') open: EventEmitter<string> = new EventEmitter<string>();
  @Output('ready') ready: EventEmitter<string> = new EventEmitter<string>();

  public dateValue: string;
  private _pluginInstance: Flatpickr;
  private _datepickerMobile = false;
  private _inputSubscription: Subscription;
  private _propagateChange = (_: any) => {};
  private _propagateTouch = () => {};

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  // throw a warning to the component user if he tries to access this property directly.
  get pluginInstance(): Flatpickr {
    console.warn('Accessing this property may bear unexpected results. Please use the shimmed methods for the correct behavior.');

    return this._pluginInstance;
  }

  get isMobile(): boolean {
    // retrieve the is mobile detection by the plugin
    return (this._pluginInstance as any).isMobile;
  }

  showPicker() {
    // idk why we need this but it works!!
    setTimeout(() => {
      this._pluginInstance.open();
    }, 0);
  }

  hidePicker() {
    this._pluginInstance.close();
  }

  jumpToDate(date: string | Date) {
    this._pluginInstance.jumpToDate(date);
  }

  clearInput() {
    this._pluginInstance.clear();
  }

  setOption(option, value) {
    const newOptionObj = {};

    // set the new option using the array notation
    newOptionObj[option] = value;

    // merge the new option to the options property
    this.fpOptions = assign({}, this.fpOptions, newOptionObj);

    // process min date for mobile device
    if (option === 'minDate') {
      this.handleMobileDateMin(value);
    }

    // process max date for mobile device
    if (option === 'maxDate') {
      this.handleMobileDateMax(value);
    }

    // reflect the new plugin option
    this._pluginInstance.set(option, value);
  }

  handleMobileDateMin(dateVal: Date) {
    if (typeof dateVal !== 'undefined' && this._datepickerMobile) {
      const newDate = moment(dateVal);

      // get the mobile input
      const mobileInput = (this.pluginInstance as any).mobileInput;

      // set the minimum date for the mobile input
      this.renderer.setProperty(mobileInput, 'min', newDate.format('YYYY-MM-DD'));
    }
  }

  handleMobileDateMax(dateVal) {
    if (typeof dateVal !== 'undefined' && this._datepickerMobile) {
      const newDate = moment(dateVal);

      // get the mobile input
      const mobileInput = (this.pluginInstance as any).mobileInput;

      // set the minimum date for the mobile input
      this.renderer.setProperty(mobileInput, 'max', newDate.format('YYYY-MM-DD'));
    }
  }

  ngOnInit() {
    // override onReady option since this is an angular implementation.
    this.fpOptions.onReady = () => {
      this.ready.emit('ready');
    };

    // override onChange option since this is an angular implementation.
    this.fpOptions.onChange = (selectedDates: Array<Date>, dateStr: string) => {
      this.dateChange.emit(dateStr);

      this._propagateChange(dateStr);
    };

    // override onClose option since this is an angular implementation.
    this.fpOptions.onClose = (selectedDates: Array<Date>, dateStr: string) => {
      this.close.emit(dateStr);

      this._propagateTouch();
    };

    // override onOpen option since this is an angular implementation.
    this.fpOptions.onOpen = (selectedDates: Array<Date>, dateStr: string) => {
      this.open.emit(dateStr);
    };
  }

  ngAfterViewInit() {
    // make sure that the input element is of type text
    this.renderer.setAttribute(this.elementRef.nativeElement, 'type', 'text');

    // make sure the datepicker is not blocked by the autocomplete
    this.renderer.setAttribute(this.elementRef.nativeElement, 'autocomplete', 'off');

    // instantiate the plugin
    this._pluginInstance = new Flatpickr(this.elementRef.nativeElement, this.fpOptions);

    // retrieve the is mobile detection by the plugin
    this._datepickerMobile = this.isMobile;

    // handle the user input
    if (typeof this.fpOptions.allowInput !== 'undefined' && this.fpOptions.allowInput === true) {
      this._inputSubscription = Observable
        .fromEvent(this.elementRef.nativeElement, 'input')
        .debounceTime(700)
        .map((evt: any) => evt.target.value)
        .filter((value: string) => value !== '')
        .subscribe((value: string) => {
          const dateInstance = this._pluginInstance.parseDate(value);

          // reflect the date
          if (dateInstance !== null) {
            (this._pluginInstance as any).setDate(dateInstance, true);
          }
        })
        ;
    }

    // process min date for mobile device
    if (typeof this.fpOptions.minDate !== 'undefined') {
      this.handleMobileDateMin(this.fpOptions.minDate);
    }

    // process max date for mobile device
    if (typeof this.fpOptions.maxDate !== 'undefined') {
      this.handleMobileDateMax(this.fpOptions.maxDate);
    }
  }

  ngOnDestroy() {
    // unsubscribe to the event
    if (typeof this._inputSubscription !== 'undefined') {
      this._inputSubscription.unsubscribe();
    }

    // destroy the plugin
    this._pluginInstance.destroy();
  }

  writeValue(value: any) {
    if (typeof value !== 'undefined') {
      this.dateValue = value;
    }

    if (typeof value !== 'undefined' && typeof this._pluginInstance !== 'undefined') {
      (this._pluginInstance as any).setDate(value);
    }
  }

  registerOnChange(fn: any) {
    this._propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this._propagateTouch = fn;
  }

}


