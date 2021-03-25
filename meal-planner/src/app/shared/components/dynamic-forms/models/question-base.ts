import { ValidatorFn } from '@angular/forms';

export interface QuestionBaseOpts<T> {
  order?: number;
  value?: T;
  key?: string;
  label?: string;
  disabled?: boolean;
  validators?: ValidatorFn[];
  units?: string;
  selectOptions?: {key: string, value: string | number}[];
  valueTooltip?: string;
  labelTooltip?: string;
}

export enum ControlType {
  input,
  select,
}

//TODO: simplify questionbase and make tooltip class that extends
export class QuestionBase<T> {
  order: number;
  value: T;
  key: string;
  label: string;
  disabled: boolean;
  validators: ValidatorFn[];
  units: string;
  selectOptions: {key: string, value: string | number}[];
  valueTooltip: string;
  labelTooltip: string;
  
  constructor(public controlType: ControlType, options: QuestionBaseOpts<T> = {}) {
    this.order = options.order === undefined ? 1 : options.order; // TODO: This defaults the order to 1 - not intended - should default to end or start depending
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.disabled = !!options.disabled;
    this.validators = options.validators || [];
    this.units = options.units || '';
    this.selectOptions = options.selectOptions || [];
    this.valueTooltip = options.valueTooltip || '';
    this.labelTooltip = options.labelTooltip || '';
  }
}