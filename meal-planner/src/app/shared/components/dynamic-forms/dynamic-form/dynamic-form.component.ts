import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, ElementRef, ChangeDetectorRef, ViewRef, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, merge } from 'rxjs';
import { tap, pairwise, takeUntil, publishBehavior, refCount, timeout } from 'rxjs/operators'

import { Subject } from 'rxjs';

import { QuestionBase } from '../models/question-base';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  constructor (
    private cdr: ChangeDetectorRef,
    private vr: ViewRef,
    private vcr: ViewContainerRef,
  ) {}

  @Input() formGroup: FormGroup;
  @Input() questions: QuestionBase<string>[] = [];
  @Output() unitConversionEvent = new EventEmitter<{[key: string]: string}>();
  @Output() formCancelEvent = new EventEmitter<void>();
  @Output() formSaveEvent = new EventEmitter<void>();
  
  private _unsubscriber$: Subject<void> = new Subject();

  unitSystem$: Observable<string>;
  unitConversionCheck$: Observable<string[]>; 
  isEdit: boolean = false;

  ngOnInit(): void {
    let b = this.vr;
    let c = this.vcr;
    let a = this.cdr;
    if (this.formGroup.controls['unitSystem']) {
      this.unitSystem$ = this.formGroup.controls['unitSystem'].valueChanges.pipe(
        publishBehavior(this.formGroup.controls['unitSystem'].value),
        refCount(),
        tap(console.log),
      );
      this.unitConversionCheck$ = this.unitSystem$.pipe(
        pairwise(),
        tap(([prevUnitSystem, currentUnitSystem]) => {
          if (this.isEdit){
            if (prevUnitSystem && prevUnitSystem !== currentUnitSystem) {
              if (confirm(`Would you like to convert your measurements from ${prevUnitSystem} to ${currentUnitSystem}?` + '\n' + 
                  'If you select cancel, the numbers will stay the same but the units will change.')) {
                this.unitConversionEvent.emit({
                  prevUnitSystem: prevUnitSystem,
                  currentUnitSystem: currentUnitSystem,
                });
              }
            }
          }
        }),
        // timeout(7000),
      );

      // merge(
      //   this.unitConversionCheck$,
      // ).pipe(
      //   takeUntil(this._unsubscriber$),
      // ).subscribe()
    }
  }

  enableFormEdit(): void {
    this.isEdit = true;
  }
  
  cancelFormEdit(): void {
    if (confirm('Are you sure you want to cancel? Unsaved changes will be lost!')) {
      this.formCancelEvent.emit();
      this.isEdit = false;
    }
  }

  saveForm(): void {
    this.formSaveEvent.emit();
    this.isEdit = false;
  } 

  ngOnDestroy(): void {
    this._unsubscriber$.next();
    this._unsubscriber$.complete();
  }
}
