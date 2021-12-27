import { IDynamicTableColumnDefinition, TableCellFormatters } from '@framework/dynamic-table';
import { IContact } from '@app/common/interfaces';

export const CONTACTS_TABLE_COLUMN_DEFINITIONS: IDynamicTableColumnDefinition<IContact>[] = [
  {
    name: 'firstName',
    label: 'Имя',
    sortable: true,
    format: TableCellFormatters.defaultValue('---'),
  },
  {
    name: 'lastName',
    label: 'Фамилия',
    sortable: true,
    format: TableCellFormatters.defaultValue('---'),
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
    getValue(contact: IContact): string {
      return contact.assignee ? `${contact.assignee.firstName} ${contact.assignee.lastName}` : '--- ---';
    },
  },
];
