import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { ConfirmationDialogModule } from '@framework/confirmation-dialog';
import { DynamicFormModule } from '@framework/dynamic-form';
import { LoadingModule } from '@framework/loading/loading.module';
import { ToastrModule } from '@framework/toastr';
import { WithTokenInterceptor } from '@common/interceptors';

import { ProfileComponent } from './profile.component';
import { routes } from './profile.routes';
import { CurrentSessionResolver ,ProfileResolver, SessionsResolver } from './resolvers';
import { ProfileService, SessionsService } from './services';

@NgModule({
  imports: [
    CommonModule,
    ConfirmationDialogModule,
    DynamicFormModule,
    HttpClientModule,
    LoadingModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    RouterModule.forChild(routes),
    ToastrModule,
  ],
  declarations: [
    ProfileComponent,
  ],
  providers: [
    CurrentSessionResolver,
    ProfileResolver,
    ProfileService,
    SessionsResolver,
    SessionsService,
    { provide: HTTP_INTERCEPTORS, useClass: WithTokenInterceptor, multi: true },
  ],
})
export class ProfileModule { }
