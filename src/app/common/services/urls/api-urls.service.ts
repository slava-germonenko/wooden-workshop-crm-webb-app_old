import { Injectable } from '@angular/core';

import { EnvironmentService } from '@common/services';

@Injectable({ providedIn: 'root' })
export class ApiUrlsService {
  public constructor(
    private readonly envService: EnvironmentService,
  ) { }

  public getCurrentUserEndpointUrl(): string {
    return `${this.envService.apiBaseUrl}/users/current`;
  }

  public getGetProfileEndpointUrl(profileId: string): string {
    return `${this.envService.apiBaseUrl}/profiles/${profileId}`;
  }

  public getUpdateProfileEndpointUrl(): string {
    return `${this.envService.apiBaseUrl}/profiles`;
  }
}
