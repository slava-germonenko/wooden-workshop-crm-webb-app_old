import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { BASE_CONFIG, SEVERITY_CLASSES } from './constants';
import { ToastrComponent } from './toastr.component';
import { ToastrRef } from './classes';
import { ToastrAction, ToastrSeverity } from './types';
import { IToastrData } from './interfaces';

@Injectable()
export class ToastrService {
  public constructor(
    private readonly snackbar: MatSnackBar,
  ) { }

  public error(message: string, toastrAction?: ToastrAction): ToastrRef {
    return this.open(message, 'error', toastrAction);
  }

  public success(message: string, toastrAction?: ToastrAction): ToastrRef {
    return this.open(message, 'success', toastrAction);
  }

  public open(message: string, severity: ToastrSeverity, toastrAction?: ToastrAction): ToastrRef {
    const toastrData: IToastrData = {
      message,
      severity,
      action: toastrAction,
    };

    const toastrConfig: MatSnackBarConfig = {
      ...BASE_CONFIG,
      panelClass: SEVERITY_CLASSES[severity],
      data: toastrData,
    };

    const ref = this.snackbar.openFromComponent(ToastrComponent, toastrConfig);
    return new ToastrRef(ref);
  }
}
