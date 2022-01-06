import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  EMPTY,
  catchError,
  map,
  pluck,
  tap,
  switchMap,
} from 'rxjs';

import { ToastrService } from '@framework/toastr';
import { DEFAULT_ERROR_MESSAGE } from '@common/constants';
import { Permissions } from '@common/enums';
import { ArrayHelper } from '@common/helpers';
import { IRole } from '@common/interfaces';

import { RoleDetailsService } from './role-details.service';

@Injectable()
export class RoleDetailsStateService {
  private readonly roleDetailsSource = new BehaviorSubject<IRole>(this.getResolvedRoleSnapshot());

  public readonly role$ = this.roleDetailsSource.asObservable();

  public readonly rolePermissions$ = this.role$.pipe(
    pluck('permissions'),
  );

  public readonly availablePermissions$ = this.rolePermissions$.pipe(
    map((rolePermissions) => ArrayHelper.extract(
      Object.values(Permissions),
      rolePermissions,
    )),
  );

  public get roleSnapshot(): IRole {
    return this.roleDetailsSource.value;
  }

  public constructor(
    private readonly roleDetailsService: RoleDetailsService,
    private readonly route: ActivatedRoute,
    private readonly toastrService: ToastrService,
  ) { }

  public addPermissionToRole(permission: Permissions): void {
    const role = this.roleSnapshot;
    if (role.permissions.includes(permission)) {
      return;
    }

    role.permissions.push(permission);
    this.roleDetailsSource.next({ ...role });
  }

  public removePermissionFromRole(permission: Permissions): void {
    const role = this.roleSnapshot;
    const permissionIndex = role.permissions.indexOf(permission);
    if (permissionIndex < 0) {
      return;
    }

    role.permissions.splice(permissionIndex, 1);
    this.roleDetailsSource.next({ ...role });
  }

  public saveRole(): Observable<IRole> {
    const role = this.roleDetailsSource.value;
    return this.roleDetailsService.setRolePermissions(role.id, role.permissions)
      .pipe(
        switchMap(() => this.roleDetailsService.updateRoleDetails(role)),
        tap(() => this.toastrService.success('Роль была успешно сохранена.')),
        catchError((err: HttpErrorResponse) => {
          this.toastrService.error(err.error?.message ?? DEFAULT_ERROR_MESSAGE);
          return EMPTY;
        }),
      );
  }

  public updateRoleDetails(newRole: Omit<IRole, 'assigneeCount' | 'permissions' | 'id'>): void {
    const role = this.roleDetailsSource.value;
    this.roleDetailsSource.next({ ...role, ...newRole });
  }

  private getResolvedRoleSnapshot(): IRole {
    return this.route.snapshot.data['role'] as IRole;
  }
}
