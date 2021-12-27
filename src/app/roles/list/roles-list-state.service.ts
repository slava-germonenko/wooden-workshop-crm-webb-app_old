import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  switchMap,
  shareReplay,
  map,
} from 'rxjs';

import { IRole } from '@common/interfaces/models';
import { IOrderByQuery, IPage, IRolesFilter } from '@common/interfaces';

import { RolesOrderField } from '../types';
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

  public constructor(private readonly rolesListService: RolesListService) {
    const roles$ = combineLatest([this.rolesFilter$, this.rolesOrder$, this.rolesPage$])
      .pipe(
        switchMap(([filter, order, page]) => this.rolesListService.getRolesList(page, filter, order)),
        shareReplay(1),
      );

    this.roles$ = roles$.pipe(
      map((rolesPage) => rolesPage.items),
    );

    this.rolesCount$ = roles$.pipe(
      map((rolesPage) => rolesPage.total),
    );
  }

  public setRolesFilet(filter: IRolesFilter | undefined): void {
    this.rolesFilterSource.next(filter);
  }

  public setRolesOrder(order: IOrderByQuery<RolesOrderField> | undefined): void {
    this.rolesOrderSource.next(order);
  }

  public setRolesPage(page: IPage): void {
    this.rolesPageSource.next(page);
  }
}
