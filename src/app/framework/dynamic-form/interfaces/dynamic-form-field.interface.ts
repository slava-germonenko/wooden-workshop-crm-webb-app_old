import { MatFormFieldAppearance } from '@angular/material/form-field';

import { IDynamicFormFieldValidator } from './dynamic-form-field-validator.interface';
import { DynamicFormFieldType } from '../types/dynamic-form-field-type';

export interface IDynamicFormField<TValue = unknown> {
  appearance?: MatFormFieldAppearance;
  label?: string;
  name: string;
  placeholder?: string;
  type: DynamicFormFieldType;
  validators?: IDynamicFormFieldValidator[] | IDynamicFormFieldValidator;
  value?: TValue;
}
