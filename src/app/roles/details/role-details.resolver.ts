import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { catchError, EMPTY, Observable, tap } from 'rxjs';

import { ToastrService } from '@framework/toastr';
import { DEFAULT_ERROR_MESSAGE } from '@common/constants';
import { IRole } from '@common/interfaces';

import { RoleDetailsService } from './role-details.service';

@Injectable()
export class RoleDetailsResolver implements Resolve<IRole> {
  public constructor(
    private readonly roleDetailsService: RoleDetailsService,
    private readonly router: Router,
    private readonly toastrService: ToastrService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot): Observable<IRole> {
    const roleId = route.paramMap.get('id');
    if (!roleId) {
      this.redirectToRolesHome();
      return EMPTY;
    }

    return this.roleDetailsService.getRoleDetails(roleId)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.toastrService.error(err.error?.message ?? DEFAULT_ERROR_MESSAGE);
          this.redirectToRolesHome();
          return EMPTY;
        }),
      );
  }

  private redirectToRolesHome(): void {
    this.router.navigate(['..']);
  }
}
