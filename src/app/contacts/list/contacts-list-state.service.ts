import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  switchMap,
  map,
} from 'rxjs';

import { IContact, IPage } from '@common/interfaces';

import { IContactsFilter } from '../interfaces';
import { ContactsListService } from './contacts-list.service';

@Injectable()
export class ContactsListStateService {
  private readonly contactsPage = new BehaviorSubject<IPage>({ index: 0, size: 25 });

  private readonly contactsFilter = new BehaviorSubject<IContactsFilter | undefined>(undefined);

  public readonly contactsFilter$ = this.contactsFilter.asObservable();

  public readonly contactsPage$ = this.contactsPage.asObservable();

  public readonly contacts$ = this.createContactsStream();

  public constructor(private readonly contactsListService: ContactsListService) { }

  public setContactsPage(page: IPage): void {
    this.contactsPage.next(page);
  }

  public setContactsFilter(filter?: IContactsFilter): void {
    this.contactsFilter.next(filter);
  }

  private createContactsStream(): Observable<IContact[]> {
    return combineLatest([this.contactsFilter$, this.contactsPage$])
      .pipe(
        switchMap(([filter, page]) => this.contactsListService.getContact(page, filter)),
        map((contactsPage) => contactsPage.items),
      );
  }
}
