import {
  DynamicTableCellFormatter,
  IDynamicTableColumnDefinition,
  TableCellFormatters
} from '@framework/dynamic-table';
import { PRODUCT_ITEM_STATUS_LABELS } from '@common/constants';
import { ProductItemStatuses } from '@common/enums';
import { IButton, IProductSize, IProductThumbnail } from '@common/interfaces';
import { SafeHtml } from '@angular/platform-browser';

export const PRODUCTS_TABLE_COLUMNS: IDynamicTableColumnDefinition<IProductThumbnail, any>[] = [
  {
    name: 'russianName',
    label: 'Наименование (рус.)',
    sortable: true,
  },
  {
    name: 'englishName',
    label: 'Наименование (англ.)',
    sortable: true,
  },
  {
    name: 'vendorCode',
    label: 'Артикул',
    sortable: true,
  },
  {
    name: 'status',
    label: 'Статус Номенклатуры',
    format: (status: ProductItemStatuses) => PRODUCT_ITEM_STATUS_LABELS[status],
  },
  {
    name: 'active',
    label: 'Статус',
    getValue(product: IProductThumbnail): string {
      return product.isActive ? 'Активен' : 'Не Активен';
    },
    getDynamicFormatter(product: IProductThumbnail): DynamicTableCellFormatter<any> {
      return product.isActive
        ? TableCellFormatters.pill('green')
        : TableCellFormatters.pill('red');
    },
  },
  {
    name: 'size',
    label: 'Размер, мм (ШхВхТ)',
    format: ({ height, width, depth }: IProductSize) => `${width}x${height}x${depth}`,
  },
  {
    name: 'category',
    label: 'Категория',
    sortable: true,
    getValue(product: IProductThumbnail): string | undefined {
      return product.category?.name;
    },
    format: TableCellFormatters.defaultValue('-- --'),
  },
  {
    name: 'material',
    label: 'Материал',
    sortable: true,
    getValue(product: IProductThumbnail): string | undefined {
      return product.material?.name;
    },
    format: TableCellFormatters.defaultValue('-- --'),
  },
];

export const PRODUCTS_TABLE_ACTIONS: Pick<IButton, 'name' | 'label' | 'icon'>[] = [
  {
    name: 'edit',
    label: 'Редактировать',
    icon: 'edit',
  },
  {
    name: 'delete',
    label: 'Удалить',
    icon: 'delete_outline',
  },
];
