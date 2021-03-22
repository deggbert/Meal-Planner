import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Subject, merge, Observable } from 'rxjs';
import { debounceTime, first, takeUntil, tap } from 'rxjs/operators';

import { UserInfoService } from 'src/app/core/services/user-info.service';
import { QuestionControlService } from 'src/app/core/services/question-control.service';

import { DynamicFormComponent } from 'src/app/shared/components/dynamic-forms/dynamic-form/dynamic-form.component';
import { UserInfo } from 'src/app/shared/interfaces/user-info.interface';
import { QuestionBase } from 'src/app/shared/components/dynamic-forms/models/question-base';

import { initialQuestions, maleQuestions, femaleQuestions, testFormQuestions } from './user-info-form.model';

import 'zone.js';

// ??TODO: move protien/fat/carb percent calc and inpu to user info page
interface FormHistory {
  form: FormGroup;
  userInfo: UserInfo;
}

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  //  TODO: move all subscription logic into tap operators and then merge all subscriptions -> allows for one subscribe and one takeuntil for unsub
  //  TODO: create components for the male and female forms. only if i want to separate them from this component
  constructor(
    private route: ActivatedRoute, 
    private userInfoService: UserInfoService,
    private qcs: QuestionControlService,
  ) { }
  @ViewChild('initialFormEl') initialFormEl: DynamicFormComponent;
  @ViewChild('maleFormEl') maleFormEl: DynamicFormComponent;
  @ViewChild('femaleFormEl') femaleFormEl: DynamicFormComponent;

  private _unsubscriber$: Subject<void> = new Subject();
  private _formHistory: FormHistory = { form: null, userInfo: null};

  initialFormChange$: Observable<string>;
  maleFormChange$: Observable<string>;
  femaleFormChange$: Observable<string>;
  maleCalcs$: Observable<string>;
  femaleCalcs$: Observable<string>;
   
  form: FormGroup;
  initialForm: FormGroup = new FormGroup({});
  initialQuestions: QuestionBase<string>[] = initialQuestions;
  maleForm: FormGroup = new FormGroup({});
  maleQuestions: QuestionBase<string>[] = maleQuestions;
  femaleForm: FormGroup = new FormGroup({});
  femaleQuestions: QuestionBase<string>[] = femaleQuestions;

  // ??TODO: should i move all form generation into dynamic form component and just pass the questions to the forms
  ngOnInit(): void {
    this.qcs.addToFormGroup(this.initialForm, this.initialQuestions);
    this.qcs.addToFormGroup(this.maleForm, this.maleQuestions);
    this.qcs.addToFormGroup(this.femaleForm, this.femaleQuestions);
    this.getResolverData();
    this.createFormChangeObservs();
    this.createFormCalcObservs();
    
    merge(
      this.initialFormChange$,
      this.maleFormChange$,
      this.femaleFormChange$,
      this.maleCalcs$,
      this.femaleCalcs$,
    ).pipe(
      takeUntil(this._unsubscriber$),
    ).subscribe();
  }

  getResolverData(): void {
    this.route.data.pipe(
      first(),
    ).subscribe((data) => {
      this._formHistory.userInfo = data.userInfo;
      if (data.userInfo?.sex === 'Male') {
        this.maleForm.patchValue(data.userInfo);
        this.form = this.maleForm;
        this._formHistory.form = this.maleForm;
      } else if (data.userInfo?.sex === 'Female') {
        this.femaleForm.patchValue(data.userInfo);
        this.form = this.femaleForm;
        this._formHistory.form = this.femaleForm;
      } else {
        this.form = this.initialForm;
        this._formHistory.form = this.initialForm;
      }
    });
  }

  createFormChangeObservs(): void {
    this.initialFormChange$ = this.initialForm.controls['sex'].valueChanges.pipe(
      tap((sex) => {
        if (sex === 'Male') {
          this.maleForm.patchValue(this.initialForm.getRawValue(), {emitEvent: false});
          this.maleFormEl.isEdit = true;
          this.form = this.maleForm;
        } else {
          this.femaleForm.patchValue(this.initialForm.getRawValue(), {emitEvent: false});
          this.femaleFormEl.isEdit = true;
          this.form = this.femaleForm;
        }
    
      })
    );
    this.maleForm.controls.age.valueChanges.pipe(
      tap(() => {
        this.maleFormEl.isEdit = false;
      })
    ).subscribe();
    this.maleFormChange$ = this.maleForm.controls['sex'].valueChanges.pipe(
      tap((sex) => {
        if (sex == 'Female') {
          this.femaleForm.patchValue(this.maleForm.getRawValue(), {emitEvent: true}); 
          let calcdUserInfoValues: UserInfo = this.userInfoService.runCalcs(this.femaleForm.value);
          this.femaleForm.patchValue(calcdUserInfoValues);
          this.maleFormEl.isEdit = false;
          this.femaleFormEl.isEdit = true;
          this.form = this.femaleForm;
        }   
      }),
    );
    this.femaleFormChange$ = this.femaleForm.controls['sex'].valueChanges.pipe(
      tap((sex) => {
        if (sex == 'Male') {
          this.maleForm.patchValue(this.femaleForm.getRawValue(), {emitEvent: true});
          let calcdUserInfoValues: UserInfo = this.userInfoService.runCalcs(this.maleForm.value);
          this.maleForm.patchValue(calcdUserInfoValues);
          this.femaleFormEl.isEdit = false;
          this.maleFormEl.isEdit = true;
          this.form = this.maleForm;
        }
      }),
    );
  }

  changeEdit() {
    this.maleFormEl.isEdit = false;
  }
   
  createFormCalcObservs(): void {
    this.maleCalcs$ = merge(this.maleForm.controls['unitSystem'].valueChanges,
      this.maleForm.controls['height'].valueChanges,
      this.maleForm.controls['weight'].valueChanges,
      this.maleForm.controls['age'].valueChanges,
      this.maleForm.controls['activityLevel'].valueChanges,
      this.maleForm.controls['neckCircum'].valueChanges,
      this.maleForm.controls['waistCircum'].valueChanges,
    ).pipe(
      debounceTime(500),
      tap(() => {
        let calcdUserInfoValues: UserInfo = this.userInfoService.runCalcs(this.maleForm.getRawValue());
        this.maleForm.patchValue(calcdUserInfoValues);
      }),
    );
    this.femaleCalcs$ = merge(this.femaleForm.controls['unitSystem'].valueChanges,
      this.femaleForm.controls['height'].valueChanges,
      this.femaleForm.controls['weight'].valueChanges,
      this.femaleForm.controls['age'].valueChanges,
      this.femaleForm.controls['activityLevel'].valueChanges,
      this.femaleForm.controls['neckCircum'].valueChanges,
      this.femaleForm.controls['waistCircum'].valueChanges,
      this.femaleForm.controls['hipCircum'].valueChanges,
    ).pipe(
      debounceTime(500),
      tap(() => {
        let calcdUserInfoValues: UserInfo = this.userInfoService.runCalcs(this.femaleForm.getRawValue());
        this.femaleForm.patchValue(calcdUserInfoValues);
      }),
    );
  }

  convertUnits(unitSystems): void {
    let convertedUserInfoInputValues: UserInfo = this.userInfoService.convertUnits(unitSystems, this.form.value);
    this.form.patchValue(convertedUserInfoInputValues, {emitEvent: false});
  }

  cancelFormEdit(): void {
    this.initialFormEl.isEdit = false; // DONT LIKE THIS METHOD
    this.maleFormEl.isEdit = false; // DONT LIKE THIS METHOD
    this.femaleFormEl.isEdit = false; // DONT LIKE THIS METHOD
    this.form = this._formHistory.form;
    if (this._formHistory.form === this.initialForm) {
      this.form.reset({}, {emitEvent: false});
    } else {
      this.form.patchValue(this._formHistory.userInfo, {emitEvent: false});
    }
  }

  saveUserInfo(): void {
    this.userInfoService.saveUserInfo(this.form.getRawValue());
    this._formHistory.form = this.form;
    this._formHistory.userInfo = this.form.getRawValue();
  }

  ngOnDestroy(): void {
    this._unsubscriber$.next();
    this._unsubscriber$.complete();
  }
}
