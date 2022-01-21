import {
  Component,
  HostBinding,
  OnInit,
  Self,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { PERMISSION_LABELS } from '@common/constants';
import { Permissions } from '@common/enums';

import { RoleDetailsStateService } from './role-details-state.service';

@Component({
  selector: 'ww-role-details',
  templateUrl: 'role-details.component.html',
  styleUrls: ['role-details.component.scss'],
  providers: [RoleDetailsStateService],
})
export class RoleDetailsComponent implements OnInit {
  @HostBinding('class')
  public hostClasses = ['pad-page-content', 'full-size'];

  public readonly availablePermissions$ = this.roleDetailsStateService.availablePermissions$;

  public readonly permissionLabels: Record<Permissions, string> = { ...PERMISSION_LABELS };

  public readonly roleNameControl = new FormControl('', Validators.required);

  public readonly rolePermissions$ = this.roleDetailsStateService.rolePermissions$;

  public constructor(
    @Self() private readonly roleDetailsStateService: RoleDetailsStateService,
    private readonly router: Router,
  ) { }

  public ngOnInit(): void {
    this.roleDetailsStateService.role$
      .subscribe((role) => {
        this.roleNameControl.setValue(role.name);
      });

    this.roleNameControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe((name) => this.roleDetailsStateService.updateRoleDetails({ name }));
  }

  public addPermission(permission: Permissions): void {
    this.roleDetailsStateService.addPermissionToRole(permission);
  }

  public removePermissions(permission: Permissions): void {
    this.roleDetailsStateService.removePermissionFromRole(permission);
  }

  public save(redirectToRoleHome = false): void {
    this.roleDetailsStateService
      .saveRole()
      .subscribe(() => {
        if (redirectToRoleHome) {
          this.router.navigate(['roles']);
        }
      });
  }
}
