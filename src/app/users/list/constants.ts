import { Validators } from '@angular/forms';

import { IDynamicFormField } from '@framework/dynamic-form';
import { IDynamicTableColumnDefinition } from '@framework/dynamic-table';
import { IUser } from '@common/interfaces/models';

export const USERS_TABLE_COLUMNS_DEFINITIONS: IDynamicTableColumnDefinition<IUser>[] = [
  {
    name: 'firstName',
    label: 'Имя',
    sortable: true,
  },
  {
    name: 'lastName',
    label: 'Фамилия',
    sortable: true,
  },
  {
    name: 'emailAddress',
    label: 'Почта',
    sortable: true,
  },
];

export const ADD_USER_FORM_FIELDS: IDynamicFormField[] = [
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
    label: 'Почта',
    type: 'text',
    validators: [
      {
        code: 'required',
        func: Validators.required,
        message: 'Пожалуйста, введите адрес электронной почты.',
      },
      {
        code: 'email',
        func: Validators.email,
        message: 'Пожалуйста, введите корректный электронной почты.',
      },
    ],
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
