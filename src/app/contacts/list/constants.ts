import { IDynamicTableColumnDefinition } from '@framework/dynamic-table';
import { IContact } from '@app/common/interfaces';

export const CONTACTS_TABLE_COLUMN_DEFINITIONS: IDynamicTableColumnDefinition<IContact>[] = [
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
  {
    name: 'phoneNumber',
    label: 'Телефон',
    sortable: true,
  },
  {
    name: 'assignee',
    label: 'Ответственный',
    sortable: false,
  },
];
