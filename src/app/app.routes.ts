import { Routes } from '@angular/router';

import { AuthorizedGuard, UnauthorizedGuard } from '@common/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    loadChildren: () => import('@app/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthorizedGuard],
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
