import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IFilePickerDialogConfig } from './file-picker-dialog-config.interface';

@Component({
  selector: 'ww-file-picker-dialog',
  templateUrl: 'file-picker-dialog.component.html',
  styleUrls: ['file-picker-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilePickerDialogComponent {
  public readonly acceptedFileTypes = this.data.allowedFileTypes
    .map((fileType) => (fileType.startsWith('.') ? fileType : `.${fileType}`))
    .join(',');

  public attachedFiles: File[] = [];

  public isDragging = false;

  public constructor(@Inject(MAT_DIALOG_DATA) public readonly data: IFilePickerDialogConfig) { }

  public excludedFiles(file: File): void {
    const fileIndex = this.attachedFiles.indexOf(file);
    if (fileIndex >= 0) {
      this.attachedFiles.splice(fileIndex, 1);
    }
  }

  public dropFiles(event: DragEvent): void {
    const droppedFiles = event.dataTransfer?.files;
    if (!droppedFiles?.length) {
      return;
    }

    this.attachedFiles = [];
    for (let index = 0; index < droppedFiles.length; index += 1) {
      this.attachedFiles.push(droppedFiles[index]);
    }
  }

  public setAttachedFiles(event: Event): void {
    if (!event.target) {
      return;
    }

    const { files } = (event.target as HTMLInputElement);
    if (!files) {
      return;
    }

    this.attachedFiles = [];
    for (let index = 0; index < files.length; index += 1) {
      this.attachedFiles.push(files[index]);
    }
  }
}
