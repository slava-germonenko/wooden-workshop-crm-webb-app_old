import {
  DynamicTableCellFormatter,
  IDynamicTableColumnDefinition,
  TableCellFormatters,
} from '@framework/dynamic-table';
import { Permissions } from '@common/enums';
import { IRole } from '@common/interfaces';
import { PERMISSION_LABELS } from '@common/constants';

export const ROLES_TABLE_COLUMNS_DEFINITIONS: IDynamicTableColumnDefinition<IRole>[] = [
  {
    name: 'name',
    label: 'Название',
    sortable: true,
  },
  {
    name: 'assigneeCount',
    label: 'Кол-во пользователей с ролью',
    sortable: true,
  },
  {
    name: 'labels',
    label: 'Лейблы',
    getValue(role: IRole): string | null {
      return role.permissions.includes(Permissions.Admin) ? PERMISSION_LABELS[Permissions.Admin] : null;
    },
    getDynamicFormatter(role: IRole): DynamicTableCellFormatter<IRole> {
      return role.permissions?.length
        ? TableCellFormatters.pill('green')
        : TableCellFormatters.defaultValue('--- ---');
    },
  },
];
