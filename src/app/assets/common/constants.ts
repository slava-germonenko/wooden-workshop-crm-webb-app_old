import { Validators } from '@angular/forms';

import { IDynamicFormDialogConfig } from '@framework/dynamic-form-dialog';

export const ADD_FOLDER_DIALOG_CONFIG: IDynamicFormDialogConfig = {
  title: 'Добавление папки',
  formControls: [
    {
      name: 'name',
      label: 'Имя папки',
      type: 'text',
      validators: {
        code: 'required',
        func: Validators.required,
        message: 'Пожалуйста, введите имя папки',
      },
    },
  ],
};

export const RENAME_FOLDER_DIALOG_CONFIG: IDynamicFormDialogConfig = {
  title: 'Редактирование папки',
  formControls: [
    {
      name: 'name',
      label: 'Имя папки',
      type: 'text',
      validators: {
        code: 'required',
        func: Validators.required,
        message: 'Пожалуйста, введите имя папки',
      },
    },
  ],
};

export const RENAME_ASSET_DIALOG_CONFIG: IDynamicFormDialogConfig = {
  title: 'Редактирование файла',
  formControls: [
    {
      name: 'assetName',
      label: 'Имя файла',
      type: 'text',
      validators: {
        code: 'required',
        func: Validators.required,
        message: 'Пожалуйста, введите имя файла',
      },
    },
  ],
};
