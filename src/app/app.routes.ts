import { Routes } from '@angular/router';

import { Permissions } from '@common/enums';
import { AuthorizedGuard, PermissionsGuard, UnauthorizedGuard } from '@common/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: 'contacts',
    loadChildren: () => import('@app/contacts/contacts.module').then((m) => m.ContactsModule),
    canActivate: [AuthorizedGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('@app/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthorizedGuard],
  },
  {
    path: 'roles',
    loadChildren: () => import('@app/roles/roles.module').then((m) => m.RolesModule),
    canActivate: [AuthorizedGuard, PermissionsGuard],
    data: { permissions: [Permissions.Admin] },
  },
  {
    path: 'users',
    loadChildren: () => import('@app/users/users.module').then((m) => m.UsersModule),
    canActivate: [AuthorizedGuard, PermissionsGuard],
    data: { permissions: [Permissions.Admin] },
  },
  {
    path: 'login',
    loadChildren: () => import('@app/login/login.module').then((m) => m.LoginModule),
    canActivate: [UnauthorizedGuard],
  },
  {
    path: 'logout',
    loadChildren: () => import('@app/logout/logout.module').then((m) => m.LogoutModule),
  },
];
