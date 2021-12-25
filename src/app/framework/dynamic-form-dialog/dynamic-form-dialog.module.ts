import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { DynamicFormModule } from '@framework/dynamic-form';

import { DynamicFormDialogComponent } from './dynamic-form-dialog.component';
import { DynamicFormDialogService } from './dynamic-form-dialog.service';

@NgModule({
  imports: [
    CommonModule,
    DynamicFormModule,
    MatButtonModule,
    MatDialogModule,
  ],
  declarations: [
    DynamicFormDialogComponent,
  ],
  providers: [
    DynamicFormDialogService,
  ],
  exports: [
    DynamicFormDialogComponent,
    DynamicFormModule,
  ],
})
export class DynamicFormDialogModule { }
