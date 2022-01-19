import { Permissions } from '@common/enums';

export const PERMISSION_LABELS: Record<Permissions, string> = {
  [Permissions.Admin]: 'Администрирование',
  [Permissions.Assets]: 'Управление ассетами',
  [Permissions.ViewAssets]: 'Просмотр ассетов',
  [Permissions.UploadAssets]: 'Загрузка ассетов',
  [Permissions.RemoveAssets]: 'Удаление ассетов',
  [Permissions.Contacts]: 'Управление Контактами',
  [Permissions.ViewContacts]: 'Просмотр Контактов',
  [Permissions.RemoveContacts]: 'Удаление контактов',
  [Permissions.Orders]: 'Управление Заказами',
  [Permissions.ViewOrders]: 'Просмотр Заказов',
  [Permissions.Products]: 'Управление Продуками',
  [Permissions.ViewProducts]: 'Просмотр Продуктов',
};
