import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { ConfirmationDialogRef } from './confirmation-dialog-ref';
import { IConfirmationDialogConfiguration } from './confirmation-dialog-configuration.interface';
import { BASE_CONFIRMATION_DIALOG_CONFIG } from './constants';

@Injectable()
export class ConfirmationDialogService {
  public constructor(private readonly matDialog: MatDialog) { }

  public open(config?: Partial<IConfirmationDialogConfiguration>): ConfirmationDialogRef {
    const completeConfig = config ? { ...BASE_CONFIRMATION_DIALOG_CONFIG, ...config } : BASE_CONFIRMATION_DIALOG_CONFIG;
    const matDialogRef = this.matDialog.open(ConfirmationDialogComponent, { data: completeConfig });
    return new ConfirmationDialogRef(matDialogRef);
  }
}
