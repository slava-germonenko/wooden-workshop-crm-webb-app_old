import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IDynamicFormDialogConfig } from './dynamic-form-dialog-config.interface';

@Component({
  selector: 'ww-dynamic-form-dialog',
  templateUrl: 'dynamic-form-dialog.component.html',
  styleUrls: ['dynamic-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormDialogComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<DynamicFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: IDynamicFormDialogConfig,
  ) { }

  public close(data?: Record<string, any>): void {
    this.dialogRef.close(data);
  }
}
