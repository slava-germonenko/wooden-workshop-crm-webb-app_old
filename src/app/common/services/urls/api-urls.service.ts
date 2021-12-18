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

  public getCurrentUserEndpointUrl(): string {
    return `${this.envService.apiBaseUrl}/users/current`;
  }

  public getGetProfileEndpointUrl(profileId: string): string {
    return `${this.envService.apiBaseUrl}/profiles/${profileId}`;
  }

  public getRefreshTokenEndpointUrl(): string {
    return `${this.envService.apiBaseUrl}/auth/refresh`;
  }

  public getUserPermissionsEndpointUrl(userId: string): string {
    return `${this.envService.apiBaseUrl}/users/${userId}/permissions`;
  }

  public getUpdateProfileEndpointUrl(): string {
    return `${this.envService.apiBaseUrl}/profiles`;
  }
}
