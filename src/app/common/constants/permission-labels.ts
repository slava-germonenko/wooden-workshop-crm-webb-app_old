import { Permissions } from '@common/enums';

export const PERMISSION_LABELS: Record<Permissions, string> = {
  [Permissions.Admin]: 'Администрирование',
  [Permissions.Assets]: 'Управление ассетами',
  [Permissions.ViewAssets]: 'Просмотр ассетов',
  [Permissions.UploadAssets]: 'Загрузка ассетов',
  [Permissions.RemoveAssets]: 'Удаление ассетов',
  [Permissions.Contacts]: 'Добавление и редактирвоание контактов',
  [Permissions.ViewContacts]: 'Просмотр Контактов',
  [Permissions.RemoveContacts]: 'Удаление контактов',
  [Permissions.Orders]: 'Добавление и редактирвоание заказов',
  [Permissions.ViewOrders]: 'Просмотр Заказов',
  [Permissions.Products]: 'Управление Продуками',
  [Permissions.ViewProducts]: 'Просмотр Продуктов',
  [Permissions.ManageProducts]: 'Добавление и редактирвоание товаров',
  [Permissions.RemoveProducts]: 'Удаление товаров',
};
