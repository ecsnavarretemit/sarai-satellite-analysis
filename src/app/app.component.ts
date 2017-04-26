/*!
 * App Component
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { Component, ElementRef, HostListener, QueryList, Renderer2, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public navbarVisible = false;

  @ViewChildren('dropdown') dropdowns: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) {  }

  enableDropdown(el) {
    // flag to determine if class should be added or not
    const add = !el.classList.contains('open');

    // add class to the element
    if (add) {
      this.renderer.addClass(el, 'open');
    } else {
      this.renderer.removeClass(el, 'open');
    }
  }

  // prevent redirection function for dropdown anchors
  dropdownLinkNoop(evt: Event) {
    evt.preventDefault();
  }

  @HostListener('document:click', ['$event'])
  documentClick(evt: Event) {
    this.dropdowns
      .filter((item: ElementRef) => {
        return !item.nativeElement.contains(evt.target);
      })
      .forEach((item: ElementRef) => {
        this.renderer.removeClass(item.nativeElement, 'open');
      })
      ;
  }

}


