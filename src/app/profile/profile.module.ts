import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { DynamicFormModule } from '@framework/dynamic-form';

import { ProfileComponent } from './components';
import { ProfileEffects, ProfileService } from './services';
import { routes } from './profile.routes';
import { reducer } from './state';

@NgModule({
  imports: [
    CommonModule,
    DynamicFormModule,
    EffectsModule.forFeature([ProfileEffects]),
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('profile', reducer),
  ],
  declarations: [
    ProfileComponent,
  ],
  providers: [
    ProfileService,
  ],
})
export class ProfileModule { }
