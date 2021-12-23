import { IDynamicTableColumnDefinition } from '@framework/dynamic-table';
import { IContact } from '@app/common/interfaces';

export const CONTACTS_TABLE_COLUMN_DEFINITIONS: IDynamicTableColumnDefinition<IContact>[] = [
  {
    name: 'firstName',
    label: 'Имя',
  },
  {
    name: 'lastName',
    label: 'Фамилия',
  },
  {
    name: 'emailAddress',
    label: 'Почта',
  },
  {
    name: 'phoneNumber',
    label: 'Телефон',
  },
];
