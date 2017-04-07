/*!
 * Responsive Media Component
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import {
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-responsive-media',
  templateUrl: './responsive-media.component.html',
  styleUrls: ['./responsive-media.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResponsiveMediaComponent implements AfterViewInit, OnDestroy {
  public loaderVisible = true;
  private loadEvt: Function;

  @Input('ratio') ratio: string;
  @Input('showLoader') showLoader = true;
  @ContentChild('media') media: ElementRef;
  @ViewChild('aspectContainer') aspectContainer: ElementRef;

  // TODO: add description attribute
  constructor(
    private renderer: Renderer2,
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
    // add class to the media element
    this.renderer.addClass(this.media.nativeElement, 'aspect__media-content');

    // add ratio class to the wrapper element when ratio is provided
    if (typeof this.ratio !== 'undefined') {
      this.renderer.addClass(this.aspectContainer.nativeElement, `aspect-ratio-${this.ratio}`);
    }

    if (this.showLoader) {
      // TODO: check if the media is an image type
      // listen to load event of the image
      this.loadEvt = this.renderer.listen(this.media.nativeElement, 'load', this.onMediaLoad.bind(this));
    }
  }

  onMediaLoad(evt: Event) {
    this.loaderVisible = false;

    // remove the event listener so we only listen once
    this.loadEvt();

    // run change detection
    this.cd.markForCheck();
  }

  ngOnDestroy() {
    // remove the event listener
    this.loadEvt();
  }

}


