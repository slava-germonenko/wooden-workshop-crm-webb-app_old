import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { toolbarReducer } from './state';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    RouterModule,
    StoreModule.forFeature('toolbar', toolbarReducer),
  ],
  declarations: [
    ToolbarComponent,
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule { }
