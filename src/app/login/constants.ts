import { IDynamicFormField } from '@framework/dynamic-form';
import { Validators } from '@angular/forms';

export const LOGIN_FORM_FIELDS: IDynamicFormField[] = [
  {
    name: 'username',
    label: 'Почта',
    type: 'text',
    validators: {
      code: 'required',
      func: Validators.required,
      message: 'Пожалуйста, введите почту.',
    },
  },
  {
    name: 'password',
    label: 'Пароль',
    type: 'password',
    validators: {
      code: 'required',
      func: Validators.required,
      message: 'Пожалуйста, введите пароль.',
    },
  },
];
