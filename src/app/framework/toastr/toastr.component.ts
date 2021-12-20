import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

import { SEVERITY_ICONS } from './constants';
import { IToastrData } from './interfaces';

@Component({
  selector: 'ww-toastr',
  templateUrl: 'toastr.component.html',
  styleUrls: ['toastr.component.scss'],
})
export class ToastrComponent {
  public severityIcon = SEVERITY_ICONS[this.data.severity];

  public actionMessage = typeof this.data.action === 'string' ? this.data.action : null;

  public actionIcon = typeof this.data.action === 'string' ? null : this.data.action?.icon ?? null;

  public constructor(
    @Inject(MAT_SNACK_BAR_DATA) public readonly data: IToastrData,
    private readonly ref: MatSnackBarRef<ToastrComponent>,
  ) { }

  public close(withAction: boolean): void {
    if (withAction) {
      this.ref.dismissWithAction();
    } else {
      this.ref.dismiss();
    }
  }
}
