import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToolbarService {
  private readonly toolbarVisibleSource = new BehaviorSubject<boolean>(false);

  public readonly toolbarVisible$ = this.toolbarVisibleSource.asObservable();

  public get toolbarVisible(): boolean {
    return this.toolbarVisibleSource.value;
  }

  public set toolbarVisible(visible: boolean) {
    this.toolbarVisibleSource.next(visible);
  }

  public showToolbar(): void {
    this.toolbarVisible = true;
  }

  public hideToolbar(): void {
    this.toolbarVisible = false;
  }
}
