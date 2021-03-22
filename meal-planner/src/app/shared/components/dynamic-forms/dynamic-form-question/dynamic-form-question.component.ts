import { Component, Input} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

import { QuestionBase} from '../models/question-base';
import { unitSystems } from 'src/app/shared/models/unit-systems.model'

@Component({
  selector: 'app-dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<string>;
  @Input() form: FormGroup;
  @Input() unitSystem: string;

  unitSystems = unitSystems;

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
}
