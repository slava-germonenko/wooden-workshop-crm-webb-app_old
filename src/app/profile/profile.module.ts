import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

import { DynamicFormModule } from '@framework/dynamic-form';
import { ToastrModule } from '@framework/toastr';
import { WithTokenInterceptor } from '@common/interceptors';

import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { routes } from './profile.routes';

@NgModule({
  imports: [
    DynamicFormModule,
    MatCardModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ToastrModule,
  ],
  declarations: [
    ProfileComponent,
  ],
  providers: [
    ProfileService,
    { provide: HTTP_INTERCEPTORS, useClass: WithTokenInterceptor, multi: true },
  ],
})
export class ProfileModule { }
