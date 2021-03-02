import { ValidatorFn } from '@angular/forms';

//TODO: simplify questionbase and make tooltip class that extends
export class QuestionBase<T> {
  value: T;
  valueTooltip: string;
  key: string;
  label: string;
  labelTooltip: string;
  disabled: boolean;
  validators: ValidatorFn[];
  order: number;
  controlType: string;
  type: string;
  measurement: string;
  options: {key: string, value: string | number}[];
  
  constructor(options: {
    value?: T;
    key?: string;
    label?: string;
    disabled?: boolean;
    validators?: ValidatorFn[];
    order?: number;
    controlType?: string;
    type?: string;
    measurement?: string;
    options?: {key: string, value: string | number}[];
    labelTooltip?: string;
    valueTooltip?: string;
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.disabled = !!options.disabled;
    this.validators = options.validators || [];
    this.order = options.order === undefined ? 1 : options.order; // TODO: This defaults the order to 1 - not intended - should default to end or start depending
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.measurement = options.measurement || '';
    this.options = options.options || [];
    this.valueTooltip = options.valueTooltip || '';
    this.labelTooltip = options.labelTooltip || '';
  }
}