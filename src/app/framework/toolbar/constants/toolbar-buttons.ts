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
    permission: [Permissions.Contacts, Permissions.ViewContacts],
  },
  {
    name: 'orders',
    label: 'Заказы',
    link: '/orders',
    permission: [Permissions.Orders, Permissions.ViewOrders],
  },
  {
    name: 'products',
    label: 'Продукты',
    link: '/products',
    permission: [Permissions.Products, Permissions.Products],
  },
];

export const PROFILE_MENU_ACTIONS: IButton[] = [
  {
    name: 'profile',
    label: 'Профиль',
    link: '/profile',
  },
  {
    name: 'sign-out',
    label: 'Выход',
    link: '/sign-out',
  },
];
