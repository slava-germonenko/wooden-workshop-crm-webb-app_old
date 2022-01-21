import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { SearchFieldModule } from '@framework/search-field';
import { DynamicTableModule } from '@framework/dynamic-table';
import { WithTokenInterceptor } from '@common/interceptors';

import { ContactsListComponent, ContactsListService, ContactsListStateService } from './list';
import { routes } from './contacts.routes';

@NgModule({
  imports: [
    SearchFieldModule,
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
