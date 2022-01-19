import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { BASE_FILE_PICKER_CONFIG } from './constants';
import { FilePickerDialogComponent } from './file-picker-dialog.component';
import { IFilePickerDialogConfig } from './file-picker-dialog-config.interface';
import { FilePickerDialogRef } from './file-picker-dialog-ref';

@Injectable()
export class FilePickerDialogService {
  public constructor(private readonly matDialog: MatDialog) { }

  public open(userDefinedConfig: Partial<IFilePickerDialogConfig>): FilePickerDialogRef {
    const config = { ...BASE_FILE_PICKER_CONFIG, ...userDefinedConfig };
    const ref = this.matDialog.open(FilePickerDialogComponent, { data: config });
    return new FilePickerDialogRef(ref);
  }
}
