import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { ConfirmationDialogModule } from '@framework/confirmation-dialog';
import { DynamicFormDialogModule } from '@framework/dynamic-form-dialog';
import { DynamicTableModule } from '@framework/dynamic-table';
import { SearchFieldModule } from '@framework/search-field';
import { ToastrModule } from '@framework/toastr';

import { CategoriesService } from './common';
import { CategoriesComponent } from './categories.component';
import { CategoriesStateService } from './categories-state.service';
import { routes } from './categories.routes';

@NgModule({
  imports: [
    CommonModule,
    ConfirmationDialogModule,
    DynamicTableModule,
    DynamicFormDialogModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    SearchFieldModule,
    ToastrModule,
  ],
  declarations: [
    CategoriesComponent,
  ],
  providers: [
    CategoriesService,
    CategoriesStateService,
  ],
})
export class CategoriesModule { }
