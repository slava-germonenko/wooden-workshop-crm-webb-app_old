import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { LoadingModule } from '@framework/loading/loading.module';

import { DynamicFormComponent } from './dynamic-form.component';

@NgModule({
  imports: [
    CommonModule,
    LoadingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DynamicFormComponent,
  ],
  exports: [
    DynamicFormComponent,
  ],
})
export class DynamicFormModule { }
