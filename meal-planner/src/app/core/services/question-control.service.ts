import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { QuestionBase } from 'src/app/shared/components/dynamic-forms/models/question-base';

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {

  addToFormGroup(form: FormGroup, questions: QuestionBase<string>[]) {
    questions.forEach((question) => {
      form.addControl(question.key, new FormControl({value: question.value, disabled: question.disabled} || '', question.validators));
    });
  }
  
}
