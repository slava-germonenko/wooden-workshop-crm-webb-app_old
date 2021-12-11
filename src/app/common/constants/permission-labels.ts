import { Permissions } from '@common/enums';

export const PERMISSION_LABELS = {
  [Permissions.Admin]: 'Администрирование',
  [Permissions.Contacts]: 'Управление Контактами',
  [Permissions.Orders]: 'Управление Заказами',
  [Permissions.Products]: 'Управление Продуками',
  [Permissions.ViewContacts]: 'Просмотр Контактов',
  [Permissions.ViewOrders]: 'Просмотр Заказов',
  [Permissions.ViewProducts]: 'Просмотр Продуктов',
};
