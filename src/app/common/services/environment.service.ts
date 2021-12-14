import { Injectable } from '@angular/core';

import { environment } from '@environment/environment';

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  public get apiBaseUrl(): string {
    return this.env.apiUrl;
  }

  private readonly env = { ...environment };
}
