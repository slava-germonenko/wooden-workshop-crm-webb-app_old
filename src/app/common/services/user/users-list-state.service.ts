import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  switchMap,
  share,
  pluck,
} from 'rxjs';

import { IPage, IUser, IUsersFilter } from '@common/interfaces';

import { UsersListService } from './users-list.service';

// Note: this should be injected as component provider
@Injectable()
export class UsersListStateService {
  private readonly usersFilterSource = new BehaviorSubject<IUsersFilter | undefined>(undefined);

  private readonly usersPageSource = new BehaviorSubject<IPage>({ size: 25, index: 0 });

  public readonly usersFilter$ = this.usersFilterSource.asObservable();

  public readonly usersPage$ = this.usersPageSource.asObservable();

  public readonly users$: Observable<IUser[]>;

  public readonly usersCount$: Observable<number>;

  public constructor(private readonly usersListService: UsersListService) {
    const usersPage$ = combineLatest([this.usersFilter$, this.usersPage$])
      .pipe(
        switchMap(([filter, page]) => this.usersListService.getUsersList(page, filter)),
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

  public setUsersPage(page: IPage): void {
    this.usersPageSource.next(page);
  }
}
