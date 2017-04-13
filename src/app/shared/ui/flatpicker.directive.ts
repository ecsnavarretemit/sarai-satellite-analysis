/*!
 * Flatpickr Directive
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { AfterViewInit, Directive, ElementRef, forwardRef, EventEmitter, Input, OnInit, OnDestroy, Output, Renderer2 } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as Flatpickr from 'flatpickr';
import assign from 'lodash-es/assign';

@Directive({
  selector: '[appFlatpicker]',
  exportAs: 'flatpickr',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FlatpickerDirective),
    multi: true
  }]
})
export class FlatpickerDirective implements AfterViewInit, OnDestroy, OnInit {
  @Input('fpOptions') fpOptions: Flatpickr.Options = {};
  @Output('close') close: EventEmitter<string> = new EventEmitter<string>();
  @Output('dateChange') dateChange: EventEmitter<string> = new EventEmitter<string>();
  @Output('open') open: EventEmitter<string> = new EventEmitter<string>();
  @Output('ready') ready: EventEmitter<string> = new EventEmitter<string>();

  public dateValue: string;
  private pluginInstance: Flatpickr;
  private _propagateChange = (_: any) => {};
  private _propagateTouch = () => {};

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  showPicker() {
    // idk why we need this but it works!!
    setTimeout(() => {
      this.pluginInstance.open();
    }, 0);
  }

  hidePicker() {
    this.pluginInstance.close();
  }

  jumpToDate(date: string | Date) {
    this.pluginInstance.jumpToDate(date);
  }

  clearInput() {
    this.pluginInstance.clear();
  }

  setOption(option, value) {
    const newOptionObj = {};

    // set the new option using the array notation
    newOptionObj[option] = value;

    // merge the new option to the options property
    this.fpOptions = assign({}, this.fpOptions, newOptionObj);

    // reflect the new plugin option
    this.pluginInstance.set(option, value);
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

    // instantiate the plugin
    this.pluginInstance = new Flatpickr(this.elementRef.nativeElement, this.fpOptions);
  }

  ngOnDestroy() {
    this.pluginInstance.destroy();
  }

  writeValue(value: any) {
    if (typeof value !== 'undefined') {
      this.dateValue = value;
    }

    if (typeof value !== 'undefined' && typeof this.pluginInstance !== 'undefined') {
      this.pluginInstance.setDate(value);
    }
  }

  registerOnChange(fn: any) {
    this._propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this._propagateTouch = fn;
  }

}


