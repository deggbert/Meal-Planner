import { Component, Input, AfterViewInit, TemplateRef, ViewChild, ElementRef, OnInit } from '@angular/core';

import { unitSystems } from '../../../models/unit-systems.model'

@Component({
  selector: 'app-units-container',
  templateUrl: './units-container.component.html',
  styleUrls: ['./units-container.component.css']
})
export class UnitsContainerComponent implements AfterViewInit {
  @ViewChild('unitDiv') unitDiv: ElementRef;
  @ViewChild('textCopyDiv') textCopyDiv: ElementRef;
  @Input() tpl: TemplateRef<any>;
  @Input() units: string;
  @Input() 
  set unitSystem(value: string) {
    this._unitSystem = value;
    if (this._isInitialized) {
      setTimeout(this.positionUnits.bind(this), 0);
    }
  }
  get unitSystem() {
    return this._unitSystem;
  }
  @Input() 
  set value(value: number | string) {
    this._value = value;
    if (this._unitSystem && typeof value !== 'string') {
      this.isUnitVisible = true;
    } else {
      this.isUnitVisible = false;
    }
    if (this._isInitialized) {
      setTimeout(this.positionUnits.bind(this), 0);
    }
  };
  get value() {
    return this._value;
  }

  private _isInitialized: boolean = false;
  private _unitSystem: string;
  private _value: number | string;
  
  isUnitVisible: boolean;
  unitSystems = unitSystems;

  ngAfterViewInit(): void {
    this.positionUnits();
    this._isInitialized = true;
    
  }

  positionUnits(): void {
    if (this.isUnitVisible) {
      const unitDivEl = this.unitDiv.nativeElement;
      const textCopyDivEl = this.textCopyDiv.nativeElement;
      if (textCopyDivEl.offsetWidth === 0) { 
        if (this.unitSystem) {
          unitDivEl.style.left = (unitDivEl.parentElement.offsetWidth - unitDivEl.offsetWidth - 5) + 'px'; //
        }
      } else {
        unitDivEl.style.left = (((unitDivEl.parentElement.offsetWidth / 2) + 3) + (textCopyDivEl.offsetWidth / 2)) + 'px';
      }
    }
  }

  isNumber(val: number | string): boolean {
    return typeof val === 'number';
  }
}
