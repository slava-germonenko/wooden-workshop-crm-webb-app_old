import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectVisible } from './state/selectors';

@Component({
  selector: 'ww-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss'],
})
export class ToolbarComponent {
  public readonly toolbarVisible$ = this.store.select(selectVisible);

  public constructor(private readonly store: Store) { }
}
