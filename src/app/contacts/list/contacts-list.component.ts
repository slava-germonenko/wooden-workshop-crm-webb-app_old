import { Component, HostBinding } from '@angular/core';

import { IOrderByQuery, IPage } from '@common/interfaces';

import { ContactsOrderField } from '../types';
import { ContactsListStateService } from './contacts-list-state.service';
import { CONTACTS_TABLE_COLUMN_DEFINITIONS } from './constants';

@Component({
  selector: 'ww-contacts-list',
  templateUrl: 'contacts-list.component.html',
  styleUrls: ['contacts-list.component.scss'],
})
export class ContactsListComponent {
  @HostBinding('class')
  public hostClasses = ['pad-page-content', 'full-size'];

  public readonly columnDefinitions = [...CONTACTS_TABLE_COLUMN_DEFINITIONS];

  public readonly contacts$ = this.contactsListStateService.contacts$;

  public readonly contactsTotal$ = this.contactsListStateService.contactsTotal$;

  public constructor(private readonly contactsListStateService: ContactsListStateService) { }

  public changePage(page: IPage): void {
    this.contactsListStateService.setContactsPage(page);
  }

  public changeSort(orderBy: IOrderByQuery<string> | null): void {
    this.contactsListStateService.setContactsOrder(orderBy as IOrderByQuery<ContactsOrderField> || undefined);
  }
}
