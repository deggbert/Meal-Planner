import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { Observable, Subject, merge } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

import { UnitsPipe } from 'src/app/shared/pipes/units-pipe/units.pipe';

import { QuestionBase } from '../models/question-base';
import { isInputQuestion } from '../models/input-question';
import { unitSystems } from 'src/app/shared/models/unit-systems.model';

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
  
  private _unsubscriber$: Subject<void> = new Subject();
  private _control: AbstractControl;
  private _controlValueChange$: Observable<string>;
  private _unitSystemChange$: Observable<string>;

  unitSystems = unitSystems;

  ngOnInit(): void {
    this._control = this.form.controls[this.question.key];
    
    if (this.question.disabled) {
      this._controlValueChange$ = this._control.valueChanges.pipe(
        tap(() => {
          this.clearUnits();
          this.addUnits();
        })
      )
    }

    if (this.form.controls['unitSystem'] && this.question.units) {
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
    ).subscribe();
  }

  clearUnits(event?: any): void {
    if (isInputQuestion(this.question) && this.question.type === 'number') {
      let number = parseFloat(this._control.value);
      if (!isNaN(number)) {
        this._control.setValue(number, {emitEvent: false});
      }
    }
    if (event) {
      setTimeout(() => event.target.selectionStart = event.target.selectionEnd = event.target.value.length, 0);
    }
  }
  
  addUnits(): void {
    if (isInputQuestion(this.question) && this.question.type === 'number') {
      let number = parseFloat(this._control.value);
      if (!isNaN(number)) {
        let numberWithUnits = this.unitsPipe.transform(number, this.form.controls['unitSystem'].value, this.question.units);
        this._control.setValue(numberWithUnits, {emitEvent: false});
      }
    }
  }


  get isValid(): boolean {
    return this._control.valid;
  }

  ngOnDestroy(): void {
    this._unsubscriber$.next();
    this._unsubscriber$.complete();
  }
}
