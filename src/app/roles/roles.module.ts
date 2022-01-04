import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { SearchFieldModule } from '@framework/search-field';
import { DynamicFormDialogModule } from '@framework/dynamic-form-dialog';
import { DynamicTableModule } from '@framework/dynamic-table';
import { ToastrModule } from '@framework/toastr';

import {
  RoleDetailsComponent,
  RoleDetailsResolver,
  RoleDetailsService,
} from './details';
import { RolesListComponent, RolesListService, RolesListStateService } from './list';
import { routes } from './roles.routes';

@NgModule({
  imports: [
    SearchFieldModule,
    CommonModule,
    DragDropModule,
    DynamicFormDialogModule,
    DynamicTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild(routes),
    ToastrModule,
    MatListModule,
  ],
  declarations: [
    RoleDetailsComponent,
    RolesListComponent,
  ],
  providers: [
    RoleDetailsResolver,
    RoleDetailsService,
    RolesListService,
    RolesListStateService,
  ],
})
export class RolesModule { }
