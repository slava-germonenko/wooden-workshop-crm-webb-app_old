import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Permissions } from '@common/enums';
import { UserStateService } from '@common/services/user';

import { LEFT_SECTION_TOOLBAR_BUTTONS, PROFILE_MENU_ACTIONS } from './constants';

@Component({
  selector: 'ww-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  public readonly leftSectionButtons = [...LEFT_SECTION_TOOLBAR_BUTTONS];

  public readonly profileMenuActions = [...PROFILE_MENU_ACTIONS];

  // public readonly toolbarVisible$ = this.store.select(selectVisible);

  public constructor(
    private readonly userService: UserStateService,
  ) { }

  public userHasAnyPermissions(permissions: Permissions[]): Observable<boolean> {
    return this.userService.userHasAnyOfPermissionsAsync(permissions);
  }
}
