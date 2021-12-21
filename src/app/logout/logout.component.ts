import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { LogoutService } from './logout.service';

@Component({
  selector: 'ww-logout',
  templateUrl: 'logout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutComponent implements OnInit {
  public constructor(private readonly logoutService: LogoutService) { }

  public ngOnInit(): void {
    this.logoutService.logout().subscribe();
  }
}
