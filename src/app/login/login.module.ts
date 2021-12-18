import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DynamicFormModule } from '@framework/dynamic-form';

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
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    LoginService,
  ],
})
export class LoginModule { }
