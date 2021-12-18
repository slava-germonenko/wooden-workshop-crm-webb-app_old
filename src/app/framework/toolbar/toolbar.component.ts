import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';

import { UserStateService } from '@common/services/user';
import { IButton } from '@common/interfaces';
import { ArrayHelper } from '@common/helpers';

import { ToolbarService } from './toolbar.service';
import { LEFT_SECTION_TOOLBAR_BUTTONS, PROFILE_MENU_ACTIONS } from './constants';

@Component({
  selector: 'ww-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  public readonly leftSectionButtons$ = this.getButtonsBasedOnUserPermissions(LEFT_SECTION_TOOLBAR_BUTTONS);

  public readonly profileMenuActions$ = this.getButtonsBasedOnUserPermissions(PROFILE_MENU_ACTIONS);

  public readonly toolbarVisible$ = this.toolbarService.toolbarVisible$;

  public constructor(
    private readonly toolbarService: ToolbarService,
    private readonly userService: UserStateService,
  ) { }

  private getButtonsBasedOnUserPermissions(buttons: IButton[]): Observable<IButton[]> {
    return this.userService.currentUserPermissions$
      .pipe(
        map((permissions) => {
          return buttons.filter((button) => !button.permissions
            || !button.permissions.length
            || ArrayHelper.haveIntersection(permissions, button.permissions));
        }),
      );
  }
}
