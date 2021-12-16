import { IDynamicFormField } from '@framework/dynamic-form';
import { Validators } from '@angular/forms';

export const PROFILE_FORM_FIELDS: IDynamicFormField[] = [
  {
    name: 'firstName',
    label: 'Имя',
    placeholder: 'Введите имя',
    type: 'text',
    validators: [
      {
        code: 'required',
        func: Validators.required,
        message: 'Пожалуйста, введите имя.',
      },
    ],
  },
  {
    name: 'lastName',
    label: 'Фамилия',
    placeholder: 'Введите фамилию',
    type: 'text',
    validators: [
      {
        code: 'required',
        func: Validators.required,
        message: 'Пожалуйста, введите фамилию.',
      },
    ],
  },
  {
    name: 'emailAddress',
    label: 'Почта',
    placeholder: 'Введите электронную почту',
    type: 'text',
    validators: [
      {
        code: 'required',
        func: Validators.required,
        message: 'Пожалуйста, введите электронную почту.',
      },
      {
        code: 'email',
        func: Validators.email,
        message: 'Пожалуйста, введите электронную почту.',
      },
    ],
  },
];
