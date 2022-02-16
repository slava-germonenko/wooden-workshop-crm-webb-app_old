import { Validators } from '@angular/forms';

import { IConfirmationDialogConfiguration } from '@framework/confirmation-dialog';
import { IDynamicFormField } from '@framework/dynamic-form';
import { IDynamicFormDialogConfig } from '@framework/dynamic-form-dialog';

export const CREATE_CATEGORY_FORM_CONTROLS: IDynamicFormField<string>[] = [
  {
    name: 'name',
    label: 'Название категории',
    type: 'text',
    validators: {
      code: 'required',
      func: Validators.required,
      message: 'Пожалуйста, введите название категории.',
    },
  },
];

export const CREATE_CATEGORY_DIALOG_CONFIG: IDynamicFormDialogConfig = {
  title: 'Добавление Категории',
  formControls: CREATE_CATEGORY_FORM_CONTROLS,
};

export const EDIT_CATEGORY_DIALOG_CONFIG: IDynamicFormDialogConfig = {
  title: 'Редактирвоание Категории',
  formControls: CREATE_CATEGORY_FORM_CONTROLS,
};

export const CONFIRM_CATEGORY_REMOVAL_DIALOG_CONFIG: Partial<IConfirmationDialogConfiguration> = {
  title: 'Удаление Категории',
  question: 'Это действие также затронет продукцию. '
    + 'У всех товаров из этой категории сбросится значение поля Категория. '
    + 'Вы дейтвительно хотите продолжить.',
};
