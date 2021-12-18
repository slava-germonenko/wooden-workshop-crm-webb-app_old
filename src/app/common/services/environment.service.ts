import { Injectable } from '@angular/core';

import { environment } from '@environment/environment';

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  public get apiBaseUrl(): string {
    return this.env.apiUrl;
  }

  public get isProduction(): boolean {
    return this.env.production;
  }

  private readonly env = { ...environment };
}
