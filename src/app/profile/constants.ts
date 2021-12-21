import { IDynamicFormField } from '@framework/dynamic-form';
import { Validators } from '@angular/forms';

export const PROFILE_FORM_FIELDS: IDynamicFormField[] = [
  {
    name: 'firstName',
    label: 'Имя',
    type: 'text',
    validators: {
      code: 'required',
      func: Validators.required,
      message: 'Пожалуйста, введите имя.',
    },
  },
  {
    name: 'lastName',
    label: 'Фамилия',
    type: 'text',
    validators: {
      code: 'required',
      func: Validators.required,
      message: 'Пожалуйста, введите фамилию.',
    },
  },
  {
    name: 'emailAddress',
    label: 'Электронная почта',
    type: 'text',
    validators: [
      {
        code: 'required',
        func: Validators.required,
        message: 'Пожалуйста, введите адрес электронной почты.',
      },
      {
        code: 'required',
        func: Validators.email,
        message: 'Пожалуйста, введите корректный адрес электронной почты.',
      },
    ],
  },
];
