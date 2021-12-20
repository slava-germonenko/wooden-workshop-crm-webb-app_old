import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DynamicFormModule } from '@framework/dynamic-form';
import { ToastrModule } from '@framework/toastr';
import { WithTokenInterceptor } from '@app/common/interceptors';

import { LoginComponent } from './login.component';
import { routes } from './login.routes';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    CommonModule,
    DynamicFormModule,
    HttpClientModule,
    MatCardModule,
    RouterModule.forChild(routes),
    ToastrModule,
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    LoginService,
    { provide: HTTP_INTERCEPTORS, useClass: WithTokenInterceptor, multi: true },
  ],
})
export class LoginModule { }
