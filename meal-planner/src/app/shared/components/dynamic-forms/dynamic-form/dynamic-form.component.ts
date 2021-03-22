import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, merge, BehaviorSubject } from 'rxjs';
import { tap, pairwise, takeUntil, publishBehavior, publishReplay, shareReplay, refCount, timeout, startWith, multicast } from 'rxjs/operators'

import { Subject } from 'rxjs';

import { QuestionBase } from '../models/question-base';
import { QuestionControlService } from 'src/app/core/services/question-control.service';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() questions: QuestionBase<string>[] = [];
  @Output() unitConversionEvent = new EventEmitter<{[key: string]: string}>();
  @Output() formCancelEvent = new EventEmitter<void>();
  @Output() formSaveEvent = new EventEmitter<void>();
  
  private _unsubscriber$: Subject<void> = new Subject();

  unitSystem$: Observable<string>;
  unitConversionCheck$: Observable<string[]>; 
  isEdit: boolean = false; 

  unitSystem: string;

  ngOnInit(): void {
    if (this.form.controls['unitSystem']) {
      this.unitSystem = this.form.controls['unitSystem'].value;

      this.unitConversionCheck$ = this.form.controls['unitSystem'].valueChanges.pipe(
        tap((unitSystem) => this.unitSystem = unitSystem),
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
      );
      
      this.unitConversionCheck$.pipe(
        takeUntil(this._unsubscriber$),
      ).subscribe()
    }
    // if (this.form.controls['unitSystem']) {
    //   this.unitSystem$ = (this.form.controls['unitSystem'].valueChanges as Subject<string>).asObservable().pipe(
    //     publishBehavior(this.form.controls['unitSystem'].value),
    //     refCount(),
    //   );
    //   this.unitConversionCheck$ = this.unitSystem$.pipe(
    //     pairwise(),
    //     tap(([prevUnitSystem, currentUnitSystem]) => {
    //       if (this.isEdit){
    //         if (prevUnitSystem && prevUnitSystem !== currentUnitSystem) {
    //           if (confirm(`Would you like to convert your measurements from ${prevUnitSystem} to ${currentUnitSystem}?` + '\n' + 
    //               'If you select cancel, the numbers will stay the same but the units will change.')) {
    //             this.unitConversionEvent.emit({
    //               prevUnitSystem: prevUnitSystem,
    //               currentUnitSystem: currentUnitSystem,
    //             });
    //           }
    //         }
    //       }
    //     }),
    //   );
      
    //   this.unitConversionCheck$.pipe(
    //     takeUntil(this._unsubscriber$),
    //   ).subscribe()
    // }
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
