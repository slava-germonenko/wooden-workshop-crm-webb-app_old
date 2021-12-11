import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Permissions } from '@common/enums';

@Injectable({ providedIn: 'root' })
export class UserService {
  public userHasPermissionAsync(permission: Permissions): Observable<boolean> {
    // TODO: Replace with actual permission check
    return of(true);
  }

  public userHasAnyOfPermissionsAsync(permissios: Permissions[]): Observable<boolean> {
    // TODO: Replace with actual permission check
    return of(true);
  }

  public userHasPermissionsAsync(permissions: Permissions[]): Observable<boolean> {
    // TODO: Replace with actual permission check
    return of(true);
  }
}
