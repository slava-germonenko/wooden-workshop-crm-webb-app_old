import { MatDialogRef } from '@angular/material/dialog';
import { filter } from 'rxjs';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';

export class ConfirmationDialogRef {
  public readonly confirmed$ = this.dialogRef.afterClosed()
    .pipe(
      filter((submitted: boolean | undefined) => !!submitted),
    );

  public readonly canceled$ = this.dialogRef.afterClosed()
    .pipe(
      filter((submitted: boolean | undefined) => submitted === false),
    );

  public readonly dismissed$ = this.dialogRef.afterClosed()
    .pipe(
      filter((submitted: boolean | undefined) => submitted === undefined),
    );

  public constructor(private readonly dialogRef: MatDialogRef<ConfirmationDialogComponent>) { }
}
