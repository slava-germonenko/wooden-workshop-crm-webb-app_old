import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { AutocompleteModule } from '@framework/autocomplete';
import { DynamicFormDialogModule } from '@framework/dynamic-form-dialog';
import { DynamicTableModule } from '@framework/dynamic-table';
import { ToastrModule } from '@framework/toastr';

import { RoleDetailsComponent } from './details';
import { RolesListComponent, RolesListService, RolesListStateService } from './list';
import { routes } from './roles.routes';

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
    RoleDetailsComponent,
    RolesListComponent,
  ],
  providers: [
    RolesListService,
    RolesListStateService,
  ],
})
export class RolesModule { }
