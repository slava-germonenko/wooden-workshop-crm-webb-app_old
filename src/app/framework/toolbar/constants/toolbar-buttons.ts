import { Permissions } from '@common/enums';

import { IButton } from '@common/interfaces';

export const LEFT_SECTION_TOOLBAR_BUTTONS: IButton[] = [
  {
    name: 'home',
    icon: 'home',
    link: '/dashboard',
  },
  {
    name: 'contacts',
    label: 'Контакты',
    link: '/contacts',
    permissions: [Permissions.Admin, Permissions.Contacts, Permissions.ViewContacts],
  },
  {
    name: 'orders',
    label: 'Заказы',
    link: '/orders',
    permissions: [Permissions.Admin, Permissions.Orders, Permissions.ViewOrders],
  },
  {
    name: 'products',
    label: 'Продукты',
    link: '/products',
    permissions: [Permissions.Admin, Permissions.Products, Permissions.Products],
  },
  {
    name: 'assets',
    label: 'Ассеты',
    link: '/assets',
    permissions: [Permissions.Admin, Permissions.Assets, Permissions.ViewAssets],
  },
];

export const PROFILE_MENU_ACTIONS: IButton[] = [
  {
    name: 'profile',
    label: 'Профиль',
    link: '/profile',
  },
  {
    name: 'users',
    label: 'Пользователи',
    link: '/users',
  },
  {
    name: 'roles',
    label: 'Роли',
    link: '/roles',
    permissions: [Permissions.Admin],
  },
  {
    name: 'sign-out',
    label: 'Выход',
    link: '/logout',
  },
];
