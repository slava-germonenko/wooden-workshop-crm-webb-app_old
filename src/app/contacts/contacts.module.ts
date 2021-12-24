import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AutocompleteModule } from '@framework/autocomplete';
import { DynamicTableModule } from '@framework/dynamic-table';
import { WithTokenInterceptor } from '@common/interceptors';

import { ContactsListComponent, ContactsListService, ContactsListStateService } from './list';
import { routes } from './contacts.routes';

@NgModule({
  imports: [
    AutocompleteModule,
    CommonModule,
    DynamicTableModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ContactsListComponent,
  ],
  providers: [
    ContactsListService,
    ContactsListStateService,
    { provide: HTTP_INTERCEPTORS, useClass: WithTokenInterceptor, multi: true },
  ],
})
export class ContactsModule { }
