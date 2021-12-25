import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { AutocompleteModule } from '@framework/autocomplete';
import { DynamicFormDialogModule } from '@framework/dynamic-form-dialog';
import { DynamicTableModule } from '@framework/dynamic-table';
import { ToastrModule } from '@framework/toastr';

import { UsersListComponent } from './list';
import { UsersManagementService } from './services';
import { routes } from './users.routes';

@NgModule({
  imports: [
    AutocompleteModule,
    CommonModule,
    DynamicFormDialogModule,
    DynamicTableModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    ToastrModule,
  ],
  declarations: [
    UsersListComponent,
  ],
  providers: [
    UsersManagementService,
  ],
})
export class UsersModule { }
