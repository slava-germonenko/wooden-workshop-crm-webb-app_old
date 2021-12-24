import { Component, HostBinding } from '@angular/core';

import { FullNamePipe } from '@framework/full-name';
import { IOrderByQuery, IPage, IUser } from '@common/interfaces';
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
  private readonly fullNamePipe = new FullNamePipe();

  @HostBinding('class')
  public hostClasses = ['pad-page-content', 'full-size'];

  public readonly displayUser = (user: IUser) => this.fullNamePipe.transform(user);

  public readonly columnDefinitions = [...CONTACTS_TABLE_COLUMN_DEFINITIONS];

  public readonly contacts$ = this.contactsListStateService.contacts$;

  public readonly contactsTotal$ = this.contactsListStateService.contactsTotal$;

  public readonly users$ = this.usersListStateService.users$;

  public selectedAssignee?: IUser;

  public constructor(
    private readonly contactsListStateService: ContactsListStateService,
    private readonly usersListStateService: UsersListStateService,
  ) { }

  public changeContactsPage(page: IPage): void {
    this.contactsListStateService.setContactsPage(page);
  }

  public changeContactsSearch(search: string): void {
    const contactsFilter = this.contactsListStateService.contactsFilter ?? {};
    contactsFilter.search = search;
    this.contactsListStateService.setContactsFilter(contactsFilter);
  }

  public changeContactsSort(orderBy: IOrderByQuery<string> | null): void {
    this.contactsListStateService.setContactsOrder(orderBy as IOrderByQuery<ContactsOrderField> || undefined);
  }

  public changeContactAssigneeFilter(assignee: IUser | undefined): void {
    this.selectedAssignee = assignee;
    const contactsFilter = this.contactsListStateService.contactsFilter ?? {};
    contactsFilter.assigneeId = assignee?.id;
    this.contactsListStateService.setContactsFilter(contactsFilter);
  }

  public changeUsersSearch(search?: string): void {
    this.usersListStateService.setUsersFilter(search ? { search } : undefined);
  }
}
