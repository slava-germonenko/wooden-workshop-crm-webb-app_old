import { Routes } from '@angular/router';

import { RoleDetailsComponent } from './details';
import { RolesListComponent } from './list';

export const routes: Routes = [
  {
    path: '',
    component: RolesListComponent,
  },
  {
    path: ':id',
    component: RoleDetailsComponent,
  },
];
