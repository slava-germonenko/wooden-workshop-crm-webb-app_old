import { Component, HostBinding } from '@angular/core';

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

  public constructor(private readonly contactsListStateService: ContactsListStateService) { }
}
