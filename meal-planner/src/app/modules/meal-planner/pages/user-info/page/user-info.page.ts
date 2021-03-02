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


// ??TODO: move protien/fat/carb percent calc and inpu to user info page
interface FormHistory {
  formGroup: FormGroup;
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
  @ViewChild('initialForm') initialForm: DynamicFormComponent;
  @ViewChild('maleForm') maleForm: DynamicFormComponent;
  @ViewChild('femaleForm') femaleForm: DynamicFormComponent;

  private _unsubscriber$: Subject<void> = new Subject();
  private _formHistory: FormHistory = { formGroup: null, userInfo: null};

  initialFormChange$: Observable<string>;
  maleFormChange$: Observable<string>;
  femaleFormChange$: Observable<string>;
  maleCalcs$: Observable<string>;
  femaleCalcs$: Observable<string>;
   
  formGroup: FormGroup;
  initialFormGroup: FormGroup = new FormGroup({});
  initialQuestions: QuestionBase<string>[] = initialQuestions;
  maleFormGroup: FormGroup = new FormGroup({});
  maleQuestions: QuestionBase<string>[] = maleQuestions;
  femaleFormGroup: FormGroup = new FormGroup({});
  femaleQuestions: QuestionBase<string>[] = femaleQuestions;

  // ??TODO: should i move all form generation into dynamic form component and just pass the questions to the forms
  ngOnInit(): void {
    this.qcs.addToFormGroup(this.initialFormGroup, this.initialQuestions);
    this.qcs.addToFormGroup(this.maleFormGroup, this.maleQuestions);
    this.qcs.addToFormGroup(this.femaleFormGroup, this.femaleQuestions);
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
        this.maleFormGroup.patchValue(data.userInfo);
        this.formGroup = this.maleFormGroup;
        this._formHistory.formGroup = this.maleFormGroup;
      } else if (data.userInfo?.sex === 'Female') {
        this.femaleFormGroup.patchValue(data.userInfo);
        this.formGroup = this.femaleFormGroup;
        this._formHistory.formGroup = this.femaleFormGroup;
      } else {
        this.formGroup = this.initialFormGroup;
        this._formHistory.formGroup = this.initialFormGroup;
      }
    });
  }

  createFormChangeObservs(): void {
    this.initialFormChange$ = this.initialFormGroup.controls['sex'].valueChanges.pipe(
      tap((sex) => {
        if (sex === 'Male') {
          this.maleFormGroup.patchValue(this.initialFormGroup.getRawValue(), {emitEvent: false});
          this.maleForm.isEdit = true;
          this.formGroup = this.maleFormGroup;
        } else {
          this.femaleFormGroup.patchValue(this.initialFormGroup.getRawValue(), {emitEvent: false});
          this.femaleForm.isEdit = true;
          this.formGroup = this.femaleFormGroup;
        }
    
      })
    );
    this.maleFormChange$ = this.maleFormGroup.controls['sex'].valueChanges.pipe(
      tap((sex) => {
        if (sex == 'Female') {
          this.femaleFormGroup.patchValue(this.maleFormGroup.getRawValue(), {emitEvent: true}); 
          let calcdUserInfoValues: UserInfo = this.userInfoService.runCalcs(this.femaleFormGroup.value);
          this.femaleFormGroup.patchValue(calcdUserInfoValues);
          setTimeout(() => this.maleForm.isEdit = false, 0);
          this.femaleForm.isEdit = true;
          this.formGroup = this.femaleFormGroup;
        }   
      }),
    );
    this.femaleFormChange$ = this.femaleFormGroup.controls['sex'].valueChanges.pipe(
      tap((sex) => {
        if (sex == 'Male') {
          this.maleFormGroup.patchValue(this.femaleFormGroup.getRawValue(), {emitEvent: true});
          let calcdUserInfoValues: UserInfo = this.userInfoService.runCalcs(this.maleFormGroup.value);
          this.maleFormGroup.patchValue(calcdUserInfoValues);
          this.femaleForm.isEdit = false;
          this.maleForm.isEdit = true;
          this.formGroup = this.maleFormGroup;
        }
      }),
    );
  }
   
  createFormCalcObservs(): void {
    this.maleCalcs$ = merge(this.maleFormGroup.controls['unitSystem'].valueChanges,
      this.maleFormGroup.controls['height'].valueChanges,
      this.maleFormGroup.controls['weight'].valueChanges,
      this.maleFormGroup.controls['age'].valueChanges,
      this.maleFormGroup.controls['activityLevel'].valueChanges,
      this.maleFormGroup.controls['neckCircum'].valueChanges,
      this.maleFormGroup.controls['waistCircum'].valueChanges,
    ).pipe(
      debounceTime(500),
      tap(() => {
        // let calcdUserInfoValues: UserInfo = this.userInfoService.runCalcs(this.maleFormGroup.getRawValue());
        // this.maleFormGroup.patchValue(calcdUserInfoValues);
      }),
    );
    this.femaleCalcs$ = merge(this.femaleFormGroup.controls['unitSystem'].valueChanges,
      this.femaleFormGroup.controls['height'].valueChanges,
      this.femaleFormGroup.controls['weight'].valueChanges,
      this.femaleFormGroup.controls['age'].valueChanges,
      this.femaleFormGroup.controls['activityLevel'].valueChanges,
      this.femaleFormGroup.controls['neckCircum'].valueChanges,
      this.femaleFormGroup.controls['waistCircum'].valueChanges,
      this.femaleFormGroup.controls['hipCircum'].valueChanges,
    ).pipe(
      debounceTime(500),
      tap(() => {
        let calcdUserInfoValues: UserInfo = this.userInfoService.runCalcs(this.femaleFormGroup.getRawValue());
        this.femaleFormGroup.patchValue(calcdUserInfoValues);
      }),
    );
  }

  convertUnits(unitSystems): void {
    let convertedUserInfoInputValues: UserInfo = this.userInfoService.convertUnits(unitSystems, this.formGroup.value);
    this.formGroup.patchValue(convertedUserInfoInputValues, {emitEvent: false});
  }

  cancelFormEdit(): void {
    this.initialForm.isEdit = false; // DONT LIKE THIS METHOD
    this.maleForm.isEdit = false; // DONT LIKE THIS METHOD
    this.femaleForm.isEdit = false; // DONT LIKE THIS METHOD
    this.formGroup = this._formHistory.formGroup;
    if (this._formHistory.formGroup === this.initialFormGroup) {
      this.formGroup.reset({}, {emitEvent: false});
    } else {
      this.formGroup.patchValue(this._formHistory.userInfo, {emitEvent: false});
    }
  }

  saveUserInfo(): void {
    this.userInfoService.saveUserInfo(this.formGroup.getRawValue());
    this._formHistory.formGroup = this.formGroup;
    this._formHistory.userInfo = this.formGroup.getRawValue();
  }

  ngOnDestroy(): void {
    this._unsubscriber$.next();
    this._unsubscriber$.complete();
  }
}
