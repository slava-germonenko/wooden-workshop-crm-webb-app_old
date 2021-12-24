import { Injectable } from '@angular/core';

import { EnvironmentService } from '@common/services';

@Injectable({ providedIn: 'root' })
export class ApiUrlsService {
  public constructor(
    private readonly envService: EnvironmentService,
  ) { }

  public getAuthorizationEndpointUrl(): string {
    return `${this.envService.apiBaseUrl}/auth`;
  }

  public getContactsEndpointUrl(): string {
    return `${this.envService.apiBaseUrl}/contacts`;
  }

  public getCurrentUserEndpointUrl(): string {
    return `${this.envService.apiBaseUrl}/users/current`;
  }

  public getExpireTokenEndpointUrl(): string {
    return `${this.envService.apiBaseUrl}/auth/expire`;
  }

  public getRefreshTokenEndpointUrl(): string {
    return `${this.envService.apiBaseUrl}/auth/refresh`;
  }

  public getUserPermissionsEndpointUrl(userId: string): string {
    return `${this.envService.apiBaseUrl}/users/${userId}/permissions`;
  }

  public getUsersEndpointUrl(): string {
    return `${this.envService.apiBaseUrl}/users`;
  }
}
