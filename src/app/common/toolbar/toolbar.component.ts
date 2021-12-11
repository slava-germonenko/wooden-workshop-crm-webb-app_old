import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Permissions } from '@common/enums';
import { UserService } from '@common/services/user.service';

import { LEFT_SECTION_TOOLBAR_BUTTONS, PROFILE_MENU_ACTIONS } from './constants';
import { selectVisible } from './state';

@Component({
  selector: 'ww-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  public readonly leftSectionButtons = [...LEFT_SECTION_TOOLBAR_BUTTONS];

  public readonly profileMenuActions = [...PROFILE_MENU_ACTIONS];

  public readonly toolbarVisible$ = this.store.select(selectVisible);

  public constructor(
    private readonly userService: UserService,
    private readonly store: Store,
  ) { }

  public userHasAnyPermissions(permissions: Permissions[]): Observable<boolean> {
    return this.userService.userHasAnyOfPermissionsAsync(permissions);
  }
}
