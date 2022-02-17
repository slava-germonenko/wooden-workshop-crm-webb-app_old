import { Permissions } from '@common/enums';

import { IButton } from '@common/interfaces';

export const LEFT_SECTION_TOOLBAR_BUTTONS: IButton[] = [
  {
    name: 'contacts',
    label: 'Контакты',
    link: '/contacts',
    permissions: [Permissions.Admin, Permissions.Contacts, Permissions.ViewContacts],
  },
  {
    name: 'products',
    label: 'Товары',
    link: '/products',
    permissions: [Permissions.Admin, Permissions.Products, Permissions.ViewProducts],
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
    name: 'administration',
    label: 'Администрирование',
    link: '/administration',
  },
  {
    name: 'users',
    label: 'Список Пользователей',
    link: '/users',
  },
  {
    name: 'sign-out',
    label: 'Выход',
    link: '/logout',
  },
];
