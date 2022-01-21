import {
  TemplateRef,
  ViewContainerRef,
  Directive,
  Input,
} from '@angular/core';
import { Subject, combineLatest } from 'rxjs';

import { Permissions } from '@common/enums';
import { UserStateService } from '@common/services';
import { ArrayHelper } from '@common/helpers';

@Directive({
  selector: '[wwWithPermissions]',
})
export class WithPermissionsDirective<T = unknown> {
  private permissionsSource = new Subject<Permissions[]>();

  @Input()
  public set wwWithPermissions(permissions: Permissions[]) {
    this.permissionsSource.next(permissions);
  }

  public constructor(
    private readonly userStateService: UserStateService,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<T>,
  ) {
    combineLatest([this.userStateService.currentUserPermissions$, this.permissionsSource])
      .subscribe(([userPermissions, requiredPermissions]) => {
        this.updateViewBasedOnPermissions(userPermissions, requiredPermissions);
      });
  }

  private updateViewBasedOnPermissions(userPermissions: Permissions[], requiredPermissions: Permissions[]): void {
    this.viewContainerRef.clear();
    if (ArrayHelper.haveIntersection(userPermissions, requiredPermissions)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
