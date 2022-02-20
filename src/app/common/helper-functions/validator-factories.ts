import { Validators } from '@angular/forms';

import { IDynamicFormFieldValidator } from '@framework/dynamic-form';

export function createRequiredValidator(spec: string): IDynamicFormFieldValidator {
  return {
    code: 'required',
    func: Validators.required,
    message: `Пожалуйста, введите ${spec}.`,
  };
}

export function createMinValidator(minValue: number, message: string): IDynamicFormFieldValidator {
  return {
    code: 'min',
    func: Validators.min(minValue),
    message,
  };
}
