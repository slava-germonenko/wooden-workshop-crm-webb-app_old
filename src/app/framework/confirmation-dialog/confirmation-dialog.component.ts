import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IConfirmationDialogConfiguration } from './confirmation-dialog-configuration.interface';

@Component({
  selector: 'ww-confirmation-dialog',
  templateUrl: 'confirmation-dialog.component.html',
  styleUrls: ['confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  public constructor(
    @Inject(MAT_DIALOG_DATA) public readonly config: IConfirmationDialogConfiguration,
  ) { }
}
