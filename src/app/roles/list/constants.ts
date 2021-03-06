import { Validators } from '@angular/forms';

import {
  DynamicTableCellFormatter,
  IDynamicTableColumnDefinition,
  TableCellFormatters,
} from '@framework/dynamic-table';
import { Permissions } from '@common/enums';
import { IRole } from '@common/interfaces';
import { PERMISSION_LABELS } from '@common/constants';
import { IDynamicFormField } from '@framework/dynamic-form';

export const ROLES_TABLE_COLUMNS_DEFINITIONS: IDynamicTableColumnDefinition<IRole>[] = [
  {
    name: 'name',
    label: 'Название',
    sortable: true,
    getLink(role: IRole): string | string[] {
      return [role.id];
    },
  },
  {
    name: 'labels',
    label: 'Лейблы',
    getValue(role: IRole): string | null {
      return role.permissions.includes(Permissions.Admin) ? PERMISSION_LABELS[Permissions.Admin] : null;
    },
    getDynamicFormatter(role: IRole): DynamicTableCellFormatter<any> {
      return role.permissions?.length
        ? TableCellFormatters.pill('green')
        : TableCellFormatters.defaultValue('--- ---');
    },
  },
];

export const ADD_ROLE_FORM_FIELDS: IDynamicFormField[] = [
  {
    name: 'name',
    label: 'Название',
    type: 'text',
    validators: {
      code: 'required',
      func: Validators.required,
      message: 'Пожалуйста, введите назваине роли.',
    },
  },
];
