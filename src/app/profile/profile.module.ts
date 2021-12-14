import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ProfileComponent } from './components';
import { ProfileEffects, ProfileService } from './services';
import { routes } from './profile.routes';
import { reducer } from './state';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([ProfileEffects]),
    HttpClientModule,
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
