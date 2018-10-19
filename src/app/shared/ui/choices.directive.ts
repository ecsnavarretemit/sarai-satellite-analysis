/*!
 * Choices Directive
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import {
  AfterViewInit,
  Directive,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as Choices from 'choices.js';
import assign from 'lodash-es/assign';

@Directive({
  selector: '[appChoices]',
  exportAs: 'choices',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ChoicesDirective),
    multi: true
  }]
})
export class ChoicesDirective implements AfterViewInit, ControlValueAccessor, OnChanges, OnInit, OnDestroy {
  @Input('selectItems') selectItems: any;
  @Input('selectPlaceholder') selectPlaceholder: string;
  @Input('choicesOptions') choicesOptions = {};
  @Input('labelItemKey') labelItemKey = 'label';
  @Input('valueItemKey') valueItemKey = 'value';

  public selectedValue: any;
  private _resolvedOptions: any;
  private _pluginInstance: any;
  private _evtListeners: Function[];
  private _propagateChange = (_: any) => {};
  private _propagateTouch = () => {};

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    let resolvedPlaceholder = null;

    if (typeof this.selectPlaceholder !== 'undefined') {
      resolvedPlaceholder = this.selectPlaceholder;
    }

    this._evtListeners = [];

    this._resolvedOptions = assign({}, this.choicesOptions, {
      removeItemButton: true,
      placeholderValue: resolvedPlaceholder
    });
  }

  ngAfterViewInit() {
    // append default option if not null
    if (this._resolvedOptions.placeholderValue !== null) {
      this.renderer.appendChild(this.elementRef.nativeElement, new Option(this._resolvedOptions.placeholderValue));
    }

    // create an instance of the plugin
    this._pluginInstance = new Choices(this.elementRef.nativeElement, this._resolvedOptions);

    // listen to the hideDropdown event and wire up the touch event for Angular
    const hideEvtListener = this.renderer.listen(this.elementRef.nativeElement, 'hideDropdown', (evt: Event) => {
      this._propagateTouch();
    });

    // listen to the choice event and wire up the change event for Angular
    const choiceEvtListener = this.renderer.listen(this.elementRef.nativeElement, 'choice', (evt: any) => {
      this._propagateChange(evt.detail.choice.value);
    });

    if (this.selectItems !== null) {
      // add items to the select input. passing true as the 4th arg automatically replaces the contens of the select
      this._pluginInstance.setChoices(this.selectItems, this.valueItemKey, this.labelItemKey, true);
    }

    // add the event listeners to the array for unbinding later
    this._evtListeners.push(hideEvtListener);
    this._evtListeners.push(choiceEvtListener);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.selectItems.isFirstChange() && typeof this._pluginInstance !== 'undefined') {
      // add items to the select input. passing true as the 4th arg automatically replaces the contens of the select
      this._pluginInstance.setChoices(changes.selectItems.currentValue, this.valueItemKey, this.labelItemKey, true);
    }
  }

  ngOnDestroy() {
    // unbind the event listeners
    this._evtListeners.map((evtListener: Function) => {
      evtListener();
    });
  }

  writeValue(value: any) {
    if (typeof value !== 'undefined') {
      this.selectedValue = value;
    }

    if (typeof value !== 'undefined' && typeof this._pluginInstance !== 'undefined') {
      this._pluginInstance.setValueByChoice(value);
    }
  }

  registerOnChange(fn: any) {
    this._propagateChange = fn;
  }

  registerOnTouched(fn: any) {
    this._propagateTouch = fn;
  }

}


