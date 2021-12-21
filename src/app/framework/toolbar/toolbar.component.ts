import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { catchError, of } from 'rxjs';

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
export class ToolbarComponent implements OnInit {
  public leftSectionButtons: IButton[] = [];

  public profileMenuActions: IButton[] = [];

  public readonly toolbarVisible$ = this.toolbarService.toolbarVisible$;

  public constructor(
    private readonly changeDetector: ChangeDetectorRef,
    private readonly toolbarService: ToolbarService,
    private readonly userService: UserStateService,
  ) { }

  public ngOnInit(): void {
    this.userService.currentUserPermissions$
      .pipe(
        catchError(() => of([])),
      )
      .subscribe((permissions) => {
        this.leftSectionButtons = LEFT_SECTION_TOOLBAR_BUTTONS.filter((button) => {
          return !button.permissions?.length || ArrayHelper.haveIntersection(permissions, button.permissions);
        });
        this.profileMenuActions = PROFILE_MENU_ACTIONS.filter((button) => {
          return !button.permissions?.length || ArrayHelper.haveIntersection(permissions, button.permissions);
        });
        this.changeDetector.markForCheck();
      });
  }
}
