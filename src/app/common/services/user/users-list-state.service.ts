import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  switchMap,
  share,
  pluck,
} from 'rxjs';

import { IUser } from '@common/interfaces/models';
import { IOrderByQuery, IPage, IUsersFilter } from '@common/interfaces';
import { UserOrderField } from '@common/types';

import { UsersListService } from './users-list.service';

// Note: this should be injected as component provider
@Injectable()
export class UsersListStateService {
  private readonly usersFilterSource = new BehaviorSubject<IUsersFilter | undefined>(undefined);

  private readonly usersOrderSource = new BehaviorSubject<IOrderByQuery<UserOrderField> | undefined>(undefined);

  private readonly usersPageSource = new BehaviorSubject<IPage>({ size: 25, index: 0 });

  public readonly usersFilter$ = this.usersFilterSource.asObservable();

  public readonly usersOrder$ = this.usersOrderSource.asObservable();

  public readonly usersPage$ = this.usersPageSource.asObservable();

  public readonly users$: Observable<IUser[]>;

  public readonly usersCount$: Observable<number>;

  public constructor(private readonly usersListService: UsersListService) {
    const usersPage$ = combineLatest([this.usersFilter$, this.usersPage$, this.usersOrder$])
      .pipe(
        switchMap(([filter, page, order]) => this.usersListService.getUsersList(page, filter, order)),
        share(),
      );

    this.users$ = usersPage$.pipe(
      pluck('items'),
    );

    this.usersCount$ = usersPage$.pipe(
      pluck('total'),
    );
  }

  public setUsersFilter(filter: IUsersFilter | undefined): void {
    this.usersFilterSource.next(filter);
  }

  public setUsersOrder(order: IOrderByQuery<UserOrderField> | undefined): void {
    this.usersOrderSource.next(order);
  }

  public setUsersPage(page: IPage): void {
    this.usersPageSource.next(page);
  }
}
