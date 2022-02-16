import {
  IDynamicTableColumnDefinition,
  TableCellFormatters,
} from '@framework/dynamic-table';
import { IMaterial } from '@common/interfaces';
import { IDynamicFormField } from '@framework/dynamic-form';
import { Validators } from '@angular/forms';
import { IDynamicFormDialogConfig } from '@framework/dynamic-form-dialog';
import { IConfirmationDialogConfiguration } from '@framework/confirmation-dialog';

const NAME_COLUMN: IDynamicTableColumnDefinition<IMaterial, string> = {
  name: 'name',
  label: 'Название',
};

const CREATED_DATE_COLUMN: IDynamicTableColumnDefinition<IMaterial, Date> = {
  name: 'created',
  label: 'Дата Добавления',
  format: TableCellFormatters.date('medium'),
};

export const MATERIALS_TABLE_COLUMNS: IDynamicTableColumnDefinition<IMaterial, any>[] = [
  NAME_COLUMN,
  CREATED_DATE_COLUMN,
];

export const MATERIALS_TABLE_ACTIONS = [
  {
    name: 'update',
    label: 'Редактировать',
    icon: 'edit',
  },
  {
    name: 'remove',
    label: 'Удалить',
    icon: 'delete_outline',
  },
];

export const CREATE_MATERIAL_FORM_CONTROLS: IDynamicFormField<string>[] = [
  {
    name: 'name',
    label: 'Название материала',
    type: 'text',
    validators: {
      code: 'required',
      func: Validators.required,
      message: 'Пожалуйста, введите название материала.',
    },
  },
];

export const CREATE_MATERIAL_DIALOG_CONFIG: IDynamicFormDialogConfig = {
  title: 'Добавление Материала',
  formControls: CREATE_MATERIAL_FORM_CONTROLS,
};

export const EDIT_MATERIAL_DIALOG_CONFIG: IDynamicFormDialogConfig = {
  title: 'Редактирвоание Материала',
  formControls: CREATE_MATERIAL_FORM_CONTROLS,
};

export const CONFIRM_MATERIAL_REMOVAL_DIALOG_CONFIG: Partial<IConfirmationDialogConfiguration> = {
  title: 'Удаление Материала',
  question: 'Это действие также затронет продукцию. '
          + 'У всех товаров из этого материала сбросится значение поля Материал. '
          + 'Вы дейтвительно хотите продолжить.',
};
