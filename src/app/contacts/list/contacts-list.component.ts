import { Component, HostBinding } from '@angular/core';
import { map } from 'rxjs';

import { IOrderByQuery, IPage } from '@common/interfaces';
import { UsersListStateService } from '@common/services/user';

import { ContactsOrderField } from '../types';
import { ContactsListStateService } from './contacts-list-state.service';
import { CONTACTS_TABLE_COLUMN_DEFINITIONS } from './constants';

@Component({
  selector: 'ww-contacts-list',
  templateUrl: 'contacts-list.component.html',
  styleUrls: ['contacts-list.component.scss'],
  providers: [UsersListStateService],
})
export class ContactsListComponent {
  @HostBinding('class')
  public hostClasses = ['pad-page-content', 'full-size'];

  public readonly columnDefinitions = [...CONTACTS_TABLE_COLUMN_DEFINITIONS];

  public readonly contacts$ = this.contactsListStateService.contacts$;

  public readonly contactsTotal$ = this.contactsListStateService.contactsTotal$;

  public readonly selectedAssigneeFilter$ = this.contactsListStateService.contactsFilter$
    .pipe(
      map((filter) => (filter ? filter.assigneeId : undefined)),
    );

  public readonly users$ = this.usersListStateService.users$;

  public constructor(
    private readonly contactsListStateService: ContactsListStateService,
    private readonly usersListStateService: UsersListStateService,
  ) { }

  public changeContactsPage(page: IPage): void {
    this.contactsListStateService.setContactsPage(page);
  }

  public changeContactsSort(orderBy: IOrderByQuery<string> | null): void {
    this.contactsListStateService.setContactsOrder(orderBy as IOrderByQuery<ContactsOrderField> || undefined);
  }

  public changeContactAssigneeFilter(assigneeId: string | undefined): void {
    this.contactsListStateService.setContactsFilter(assigneeId ? { assigneeId } : undefined);
  }

  public changeUsersSearch(search?: string): void {
    this.usersListStateService.setUsersFilter(search ? { search } : undefined);
  }
}
