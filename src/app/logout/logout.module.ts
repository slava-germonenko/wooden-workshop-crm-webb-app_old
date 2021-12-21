import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { routes } from './logout.routes';
import { LogoutComponent } from './logout.component';
import { LogoutService } from './logout.service';

@NgModule({
  imports: [
    MatProgressSpinnerModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    LogoutComponent,
  ],
  providers: [
    LogoutService,
  ],
})
export class LogoutModule { }
