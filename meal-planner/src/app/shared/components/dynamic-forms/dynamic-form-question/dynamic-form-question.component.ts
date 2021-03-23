import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { Observable, Subject, merge } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

import { UnitsPipe } from 'src/app/shared/pipes/units-pipe/units.pipe'

import { QuestionBase} from '../models/question-base';
import { unitSystems } from 'src/app/shared/models/unit-systems.model'

@Component({
  selector: 'app-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent implements OnInit, OnDestroy {
  constructor(
    private unitsPipe: UnitsPipe 
  ) {}
  @Input() question: QuestionBase<string>;
  @Input() form: FormGroup;
  @Input() unitSystem: string;
  
  private _unsubscriber$: Subject<void> = new Subject();
  private _control: AbstractControl;
  private _controlValueChange$: Observable<string>;
  private _unitSystemChange$: Observable<string>;

  unitSystems = unitSystems;

  ngOnInit(): void {
    this._control = this.form.controls[this.question.key];
    
    if (this.question.disabled) {
      this._controlValueChange$ = this._control.valueChanges.pipe(
        tap((x) => {
          this.clearUnits();
          this.addUnits();
        })
      )
    }

    if (this.form.controls['unitSystem'] && this.question.measurement) {
      this._unitSystemChange$ = this.form.controls['unitSystem'].valueChanges.pipe(
        tap(() => {
          this.clearUnits();
          this.addUnits();
        })
      )
    }

    merge(
      this._controlValueChange$,
      this._unitSystemChange$,
    ).pipe(
      takeUntil(this._unsubscriber$)
    )
  }

  get isValid(): boolean {
    return this.form.controls[this.question.key].valid;
  }

  convertToNumber(event: Event): void {
    if (this.question.type === 'number') {
      this.form.controls[this.question.key].setValue(+(event.target as HTMLInputElement).value);
    }
  }
  
  isValueOnlyNumber(): boolean {
    if (this.question.type === 'number') {
      return true;
    }
    return /^(\d+\.\d+|\d+)$/.test(this.form.controls[this.question.key].value);
  }

  clearUnits(event?: any): void {
    if (this.question.type === 'number') {
      let number = parseFloat(this._control.value);
      this._control.setValue(number, {emitEvent: false});
    }
    if (event) {
      setTimeout(() => event.target.selectionStart = event.target.selectionEnd = event.target.value.length, 0);
    }
  }
  
  addUnits(): void {
    if (this.question.type === 'number') {
      let number = parseFloat(this._control.value);
      let numberWithUnits = this.unitsPipe.transform(number, this.form.controls['unitSystem'].value, this.question.measurement);
      this._control.setValue(numberWithUnits, {emitEvent: false});
    }
  }

  ngOnDestroy(): void {
    this._unsubscriber$.next();
    this._unsubscriber$.complete();
  }
}
