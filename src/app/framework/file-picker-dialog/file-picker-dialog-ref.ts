import { MatDialogRef } from '@angular/material/dialog';
import { Observable, filter } from 'rxjs';

import { FilePickerDialogComponent } from './file-picker-dialog.component';

export class FilePickerDialogRef {
  public readonly canceled$: Observable<void> = this.dialogRef.afterClosed()
    .pipe(
      filter((files) => !files),
    );

  public readonly submitted$: Observable<File[]> = this.dialogRef.afterClosed()
    .pipe(
      filter((files) => !!files),
    );

  public constructor(private readonly dialogRef: MatDialogRef<FilePickerDialogComponent>) { }
}
