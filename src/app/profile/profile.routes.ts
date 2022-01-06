import { Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { CurrentSessionResolver, ProfileResolver, SessionsResolver } from './resolvers';

export const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    resolve: {
      currentSession: CurrentSessionResolver,
      profile: ProfileResolver,
      sessions: SessionsResolver,
    },
  },
];
