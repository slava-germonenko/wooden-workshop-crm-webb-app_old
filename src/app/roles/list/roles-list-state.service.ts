import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  switchMap,
  shareReplay,
  map,
  filter, tap,
} from 'rxjs';

import { DynamicFormDialogService } from '@framework/dynamic-form-dialog';
import { IRole } from '@common/interfaces/models';
import { IOrderByQuery, IPage, IRolesFilter } from '@common/interfaces';

import { RolesOrderField } from '../types';
import { ADD_ROLE_FORM_FIELDS } from './constants';
import { RolesListService } from './roles-list.service';

@Injectable()
export class RolesListStateService {
  private readonly rolesFilterSource = new BehaviorSubject<IRolesFilter | undefined>(undefined);

  private readonly rolesOrderSource = new BehaviorSubject<IOrderByQuery<RolesOrderField> | undefined>(undefined);

  private readonly rolesPageSource = new BehaviorSubject<IPage>({ index: 0, size: 25 });

  public readonly rolesFilter$ = this.rolesFilterSource.asObservable();

  public readonly rolesOrder$ = this.rolesOrderSource.asObservable();

  public readonly rolesPage$ = this.rolesPageSource.asObservable();

  public readonly roles$: Observable<IRole[]>;

  public readonly rolesCount$: Observable<number>;

  public constructor(
    private readonly dialogsService: DynamicFormDialogService,
    private readonly rolesListService: RolesListService,
  ) {
    const roles$ = combineLatest([this.rolesFilter$, this.rolesOrder$, this.rolesPage$])
      .pipe(
        switchMap(([roleFilter, order, page]) => this.rolesListService.getRolesList(page, roleFilter, order)),
        shareReplay(1),
      );

    this.roles$ = roles$.pipe(
      map((rolesPage) => rolesPage.items),
    );

    this.rolesCount$ = roles$.pipe(
      map((rolesPage) => rolesPage.total),
    );
  }

  public addRole(): Observable<IRole> {
    return this.dialogsService.openFormDialog({
      title: 'Добавление роли',
      formControls: [...ADD_ROLE_FORM_FIELDS],
    })
      .afterClosed()
      .pipe(
        filter((role) => !!role),
        switchMap((role) => this.rolesListService.createRole({ ...role, permissions: [] })),
        tap(() => this.goToFirstPage()),
      );
  }

  public setRolesFilet(roleFilter: IRolesFilter | undefined): void {
    this.rolesFilterSource.next(roleFilter);
  }

  public setRolesOrder(order: IOrderByQuery<RolesOrderField> | undefined): void {
    this.rolesOrderSource.next(order);
  }

  public setRolesPage(page: IPage): void {
    this.rolesPageSource.next(page);
  }

  private goToFirstPage(): void {
    const page = this.rolesPageSource.value;
    page.index = 0;
    this.rolesPageSource.next(page);
  }
}
