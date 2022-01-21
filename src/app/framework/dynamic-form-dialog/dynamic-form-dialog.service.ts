import { Injectable } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DynamicFormDialogComponent } from './dynamic-form-dialog.component';
import { IDynamicFormDialogConfig } from './dynamic-form-dialog-config.interface';

@Injectable()
export class DynamicFormDialogService {
  public constructor(private readonly matDialog: MatDialog) { }

  public openFormDialog(config: IDynamicFormDialogConfig, value?: Record<string, any>): MatDialogRef<unknown> {
    return this.matDialog.open(DynamicFormDialogComponent, {
      data: {
        config,
        value,
      },
    });
  }
}
