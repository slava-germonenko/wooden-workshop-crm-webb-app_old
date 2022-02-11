import { ITreeNode } from '@common/interfaces';

export const ADMINISTRATION_TREE_ITEMS: ITreeNode[] = [
  {
    name: 'users-management',
    label: 'Управление Пользователями',
    children: [
      {
        name: 'user-list',
        label: 'Список Пользователей',
        link: '/users',
      },
      {
        name: 'roles-list',
        label: 'Список Ролей',
        link: '/roles',
      },
    ],
  },
  {
    name: 'products',
    label: 'Управтелине Продукцией',
    children: [
      {
        name: 'categories',
        label: 'Категории Товаров',
      },
      {
        name: 'price-types',
        label: 'Список Типов Цен',
        // link: '/prices',
      },
      {
        name: 'materials',
        label: 'Материалы',
      },
    ],
  },
];
