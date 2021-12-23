import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  switchMap,
  map, shareReplay,
} from 'rxjs';

import { IContact } from '@common/interfaces/models';
import { IOrderByQuery, IPage, IPagedCollection } from '@common/interfaces';

import { IContactsFilter } from '../interfaces';
import { ContactsListService } from './contacts-list.service';
import { ContactsOrderField } from '../types';

@Injectable()
export class ContactsListStateService {
  private readonly contactsFilterSource = new BehaviorSubject<IContactsFilter | undefined>(undefined);

  private readonly contactsOrderSource = new BehaviorSubject<IOrderByQuery<ContactsOrderField> | undefined>(undefined);

  private readonly contactsPageSource = new BehaviorSubject<IPage>({ index: 0, size: 25 });

  public readonly contactsFilter$ = this.contactsFilterSource.asObservable();

  public readonly contactsOrderQuery$ = this.contactsOrderSource.asObservable();

  public readonly contactsPage$ = this.contactsPageSource.asObservable();

  public readonly contacts$: Observable<IContact[]>;

  public readonly contactsTotal$: Observable<number>;

  public constructor(private readonly contactsListService: ContactsListService) {
    const contactsStream = this.createContactsStream();
    this.contacts$ = contactsStream.pipe(
      map((contactsPage) => contactsPage.items),
    );

    this.contactsTotal$ = contactsStream.pipe(
      map((contactsPage) => contactsPage.total),
    );
  }

  public setContactsPage(page: IPage): void {
    this.contactsPageSource.next(page);
  }

  public setContactsFilter(filter?: IContactsFilter): void {
    this.contactsFilterSource.next(filter);
  }

  public setContactsOrder(orderQuery?: IOrderByQuery<ContactsOrderField>): void {
    this.contactsOrderSource.next(orderQuery);
  }

  private createContactsStream(): Observable<IPagedCollection<IContact>> {
    return combineLatest([this.contactsPage$, this.contactsOrderQuery$, this.contactsFilter$])
      .pipe(
        switchMap(([page, order, filter]) => this.contactsListService.getContact(page, filter, order)),
        shareReplay(1),
      );
  }
}
