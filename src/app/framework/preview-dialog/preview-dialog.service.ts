import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { AssetFileType } from '@common/types';

import { PreviewDialogComponent } from './preview-dialog.component';
import { PreviewDialogConfig } from './preview-dialog-config';

@Injectable()
export class PreviewDialogService {
  public constructor(private readonly matDialog: MatDialog) { }

  public openPreview(fileUrl: string, fileName: string, type: AssetFileType): Observable<void> {
    const config: PreviewDialogConfig = {
      fileUrl,
      fileName,
      type,
    };
    return this.matDialog
      .open(PreviewDialogComponent, { data: config })
      .afterClosed();
  }
}
