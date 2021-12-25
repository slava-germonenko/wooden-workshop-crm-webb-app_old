import { Component, HostBinding } from '@angular/core';
import { filter, switchMap, tap } from 'rxjs';

import { DynamicFormDialogService } from '@framework/dynamic-form-dialog';
import { IPage, IOrderByQuery, IUser } from '@common/interfaces';
import { UsersListStateService } from '@common/services/user';
import { UserOrderField } from '@common/types';

import { UsersManagementService } from '../services';
import { ADD_USER_FORM_FIELDS, USERS_TABLE_COLUMNS_DEFINITIONS } from './constants';

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

  public constructor(
    private readonly dialogFormService: DynamicFormDialogService,
    private readonly usersListStateService: UsersListStateService,
    private readonly usersManagementService: UsersManagementService,
  ) { }

  public openAddUserDialog(): void {
    this.dialogFormService.openFormDialog({
      title: 'Добавление пользователя',
      formControls: [...ADD_USER_FORM_FIELDS],
    })
      .afterClosed()
      .pipe(
        filter((user) => !!user),
        switchMap((user: Omit<IUser, 'id'> & { password: string }) => this.usersManagementService.createUser(user)),
        tap(() => this.goToFirstPage()),
      )
      .subscribe();
  }

  public setUsersOrder(orderBy: IOrderByQuery<string> | null): void {
    this.usersListStateService.setUsersOrder(orderBy as IOrderByQuery<UserOrderField> ?? undefined);
  }

  public setUsersPage(page: IPage): void {
    this.usersListStateService.setUsersPage(page);
  }

  public setUsersSearch(search: string): void {
    this.usersListStateService.setUsersFilter(search ? { search } : undefined);
  }

  private goToFirstPage(): void {
    const page = this.usersListStateService.usersPage;
    page.index = 0;
    this.usersListStateService.setUsersPage(page);
  }
}
