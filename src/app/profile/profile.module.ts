import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { ProfileComponent } from './components';
import { ProfileEffects, ProfileService } from './services';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([ProfileEffects]),
    HttpClientModule,
  ],
  declarations: [
    ProfileComponent,
  ],
  providers: [
    ProfileService,
  ],
})
export class ProfileModule { }
