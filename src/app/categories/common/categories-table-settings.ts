import { IDynamicTableColumnDefinition, TableCellFormatters } from '@framework/dynamic-table';
import { ICategory } from '@common/interfaces';

const NAME_COLUMN: IDynamicTableColumnDefinition<ICategory, string> = {
  name: 'name',
  label: 'Название',
};

const CREATED_DATE_COLUMN: IDynamicTableColumnDefinition<ICategory, Date> = {
  name: 'created',
  label: 'Дата Добавления',
  format: TableCellFormatters.date('medium'),
};

export const CATEGORIES_TABLE_COLUMNS: IDynamicTableColumnDefinition<ICategory, any>[] = [
  NAME_COLUMN,
  CREATED_DATE_COLUMN,
];

export const CATEGORIES_TABLE_ACTIONS = [
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
