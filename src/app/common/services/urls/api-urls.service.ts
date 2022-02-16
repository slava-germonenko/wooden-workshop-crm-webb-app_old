import { Injectable } from '@angular/core';

import { EnvironmentService } from '@common/services';

@Injectable({ providedIn: 'root' })
export class ApiUrlsService {
  public constructor(
    private readonly envService: EnvironmentService,
  ) { }

  public getAssetsBaseEndpointsUrl(): string {
    return `${this.envService.apiBaseUrl}/assets`;
  }

  public getAssetBaseEndpointsUrl(assetId: string): string {
    return `${this.envService.apiBaseUrl}/assets/${assetId}`;
  }

  public getAuthorizationEndpointUrl(): string {
    return `${this.envService.apiBaseUrl}/auth`;
  }

  public getCategoriesBaseEndpointUrl(): string {
    return `${this.envService.apiBaseUrl}/categories`;
  }

  public getCategoryBaseEndpointUrl(categoryId: string): string {
    return `${this.envService.apiBaseUrl}/categories/${categoryId}`;
  }

  public getContactsEndpointUrl(): string {
    return `${this.envService.apiBaseUrl}/contacts`;
  }

  public getCurrentSessionEndpointUrl(): string {
    return `${this.envService.apiBaseUrl}/auth/sessions/current`;
  }

  public getCurrentUserEndpointUrl(): string {
    return `${this.envService.apiBaseUrl}/users/current`;
  }

  public getExpireTokenEndpointUrl(): string {
    return `${this.envService.apiBaseUrl}/auth/expire`;
  }

  public getFolderAssetsEndpointUrl(folderId: string): string {
    return `${this.envService.apiBaseUrl}/folders/${folderId}/assets`;
  }

  public getFolderBaseEndpointUrl(folderId: string): string {
    return `${this.envService.apiBaseUrl}/folders/${folderId}`;
  }

  public getFoldersBaseEndpointsUrl(): string {
    return `${this.envService.apiBaseUrl}/folders`;
  }

  public getMaterialBaseEndpointUrl(materialId: string): string {
    return `${this.envService.apiBaseUrl}/materials/${materialId}`;
  }

  public getMaterialsBaseEndpointUrl(): string {
    return `${this.envService.apiBaseUrl}/materials`;
  }

  public getRefreshTokenEndpointUrl(): string {
    return `${this.envService.apiBaseUrl}/auth/refresh`;
  }

  public getRoleDetailsEndpointUrl(roleId: string) {
    return `${this.envService.apiBaseUrl}/roles/${roleId}`;
  }

  public getRolePermissionsEndpointUrl(roleId: string) {
    return `${this.envService.apiBaseUrl}/roles/${roleId}/permissions`;
  }

  public getRolesEndpointUrl(): string {
    return `${this.envService.apiBaseUrl}/roles`;
  }

  public getSessionEndpointUrl(sessionId: string): string {
    return `${this.envService.apiBaseUrl}/auth/sessions/${sessionId}`;
  }

  public getUserPermissionsEndpointUrl(userId: string): string {
    return `${this.envService.apiBaseUrl}/users/${userId}/permissions`;
  }

  public getUserSessionsEndpointUrl(userId: string): string {
    return `${this.envService.apiBaseUrl}/users/${userId}/sessions`;
  }

  public getUsersEndpointUrl(): string {
    return `${this.envService.apiBaseUrl}/users`;
  }
}
