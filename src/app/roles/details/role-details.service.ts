import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IRole } from '@common/interfaces/models';
import { ApiUrlsService } from '@common/services';
import { Permissions } from '@common/enums';

@Injectable()
export class RoleDetailsService {
  public constructor(
    private readonly apiUrlsService: ApiUrlsService,
    private readonly httpClient: HttpClient,
  ) { }

  public getRoleDetails(roleId: string): Observable<IRole> {
    return this.httpClient.get<IRole>(
      this.apiUrlsService.getRoleDetailsEndpointUrl(roleId),
    );
  }

  public updateRoleDetails(role: Omit<IRole, 'assigneeCount' | 'permissions'>): Observable<IRole> {
    return this.httpClient.patch<IRole>(
      this.apiUrlsService.getRolesEndpointUrl(),
      role,
    );
  }

  public setRolePermissions(roleId: string, permissions: Permissions[]): Observable<void> {
    return this.httpClient.put<void>(
      this.apiUrlsService.getRolePermissionsEndpointUrl(roleId),
      { permissions },
    );
  }
}
