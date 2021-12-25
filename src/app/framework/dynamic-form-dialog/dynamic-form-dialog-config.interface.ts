import { IDynamicFormField } from '@framework/dynamic-form';

export interface IDynamicFormDialogConfig {
  cancelText?: string;
  submitText?: string;
  title: string;
  formControls: IDynamicFormField[];
}
