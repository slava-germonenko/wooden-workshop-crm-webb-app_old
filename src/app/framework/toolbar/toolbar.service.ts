import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToolbarService {
  private readonly toolbarVisibleSource = new BehaviorSubject<boolean>(true);

  public readonly toolbarVisible$ = this.toolbarVisibleSource.asObservable();

  public get toolbarVisible(): boolean {
    return this.toolbarVisibleSource.value;
  }

  private set toolbarVisible(visible: boolean) {
    this.toolbarVisibleSource.next(visible);
  }
}
