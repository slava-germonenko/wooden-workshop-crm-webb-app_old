import { Component, HostBinding } from '@angular/core';

import { IOrderByQuery, IPage } from '@common/interfaces';

import { RolesOrderField } from '../types';
import { RolesListStateService } from './roles-list-state.service';
import { ROLES_TABLE_COLUMNS_DEFINITIONS } from './constants';

@Component({
  selector: 'ww-roles',
  templateUrl: 'roles-list.component.html',
  styleUrls: ['roles-list.component.scss'],
})
export class RolesListComponent {
  @HostBinding('class')
  public hostClasses = ['pad-page-content', 'full-size'];

  public readonly contacts$ = this.rolesListStateService.roles$;

  public totalRoles$ = this.rolesListStateService.rolesCount$;

  public tableColumns = [...ROLES_TABLE_COLUMNS_DEFINITIONS];

  public constructor(
    private readonly rolesListStateService: RolesListStateService,
  ) { }

  public setRolesSearch(search: string): void {
    this.rolesListStateService.setRolesFilet(search ? { name: search } : undefined);
  }

  public setRolesOrder(order: IOrderByQuery<string> | null): void {
    this.rolesListStateService.setRolesOrder(order as IOrderByQuery<RolesOrderField> | undefined);
  }

  public setRolesPage(page: IPage): void {
    this.rolesListStateService.setRolesPage(page);
  }
}
