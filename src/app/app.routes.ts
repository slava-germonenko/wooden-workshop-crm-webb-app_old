import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () => import('@app/profile').then((m) => m.ProfileModule),
  },
];
