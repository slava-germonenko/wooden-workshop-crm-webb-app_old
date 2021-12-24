import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { AutocompleteModule } from '@framework/autocomplete';
import { DynamicTableModule } from '@framework/dynamic-table';

import { UsersListComponent } from './list';
import { routes } from './users.routes';

@NgModule({
  imports: [
    AutocompleteModule,
    CommonModule,
    DynamicTableModule,
    MatButtonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    UsersListComponent,
  ],
})
export class UsersModule { }
