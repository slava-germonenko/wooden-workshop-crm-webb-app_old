import { Injectable } from '@angular/core';

import { environment } from '@environment/environment';

import { EnvironmentModule } from './environment.module';

@Injectable({ providedIn: EnvironmentModule })
export class EnvironmentService {
  public get apiBaseUrl(): string {
    return this.env.apiUrl;
  }

  private readonly env = { ...environment };
}
