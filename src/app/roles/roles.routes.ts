import { Routes } from '@angular/router';

import { RoleDetailsComponent, RoleDetailsResolver } from './details';
import { RolesListComponent } from './list';

export const routes: Routes = [
  {
    path: '',
    component: RolesListComponent,
  },
  {
    path: ':id',
    component: RoleDetailsComponent,
    resolve: {
      role: RoleDetailsResolver,
    },
  },
];
