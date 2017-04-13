/*!
 * Choices Directive Test
 *
 * Copyright(c) Exequiel Ceasar Navarrete <esnavarrete1@up.edu.ph>
 * Licensed under MIT
 */

import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicesDirective } from './choices.directive';

// container component for testing the directive
@Component({
  selector: 'app-container',
  template: `
    <select appChoices
      #choiceSelect=choices
      [selectItems]="provinces"
      valueItemKey="name"
      labelItemKey="name"
      selectPlaceholder="Select Province">
    </select>
  `,
})
export class ContainerComponent implements OnInit {
  public selectItems: any[];

  @ViewChild('choiceSelect') choiceSelect: ChoicesDirective;

  ngOnInit() {
    this.selectItems = [{
      name: 'Laguna'
    }];
  }
}

describe('ChoicesDirective', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContainerComponent,
        ChoicesDirective
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

});


