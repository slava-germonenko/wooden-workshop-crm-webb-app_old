import { ValidatorFn } from '@angular/forms';

export interface IDynamicFormFieldValidator {
  code?: string;
  func: ValidatorFn;
  message?: string
}
