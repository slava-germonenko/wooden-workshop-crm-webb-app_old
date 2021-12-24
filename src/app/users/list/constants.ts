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
