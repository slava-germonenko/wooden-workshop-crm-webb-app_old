import { Routes } from '@angular/router';

import { UnauthorizedGuard } from '@common/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('@app/login/login.module').then((m) => m.LoginModule),
    canActivate: [UnauthorizedGuard],
  },
];
