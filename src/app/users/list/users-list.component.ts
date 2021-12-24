import { Component, HostBinding } from '@angular/core';

import { IPage, IOrderByQuery } from '@common/interfaces';
import { UserOrderField } from '@common/types';
import { UsersListStateService } from '@common/services/user';

import { USERS_TABLE_COLUMNS_DEFINITIONS } from './constants';

@Component({
  selector: 'ww-users-list',
  templateUrl: 'users-list.component.html',
  styleUrls: ['users-list.component.scss'],
  providers: [UsersListStateService],
})
export class UsersListComponent {
  @HostBinding('class')
  public hostClasses = ['pad-page-content', 'full-size'];

  public readonly tableColumns = [...USERS_TABLE_COLUMNS_DEFINITIONS];

  public readonly users$ = this.usersListStateService.users$;

  public readonly usersTotal$ = this.usersListStateService.usersCount$;

  public constructor(private readonly usersListStateService: UsersListStateService) { }

  public setUsersOrder(orderBy: IOrderByQuery<string> | null): void {
    this.usersListStateService.setUsersOrder(orderBy as IOrderByQuery<UserOrderField> ?? undefined);
  }

  public setUsersPage(page: IPage): void {
    this.usersListStateService.setUsersPage(page);
  }

  public setUsersSearch(search: string): void {
    this.usersListStateService.setUsersFilter(search ? { search } : undefined);
  }
}
