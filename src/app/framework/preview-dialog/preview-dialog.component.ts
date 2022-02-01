import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

import { isImageAssetFileType } from '@common/type-guards';

import { PreviewDialogConfig } from './preview-dialog-config';

@Component({
  selector: 'ww-preview-dialog',
  templateUrl: 'preview-dialog.component.html',
  styleUrls: ['preview-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewDialogComponent {
  public readonly contentType = isImageAssetFileType(this.config.type) ? 'image' : 'document';

  @HostBinding('class.fixed-size')
  public fixedSizeEnabled = true;

  public get fileName(): string {
    return this.config.fileName;
  }

  public fileUrl = this.config.fileUrl;

  public constructor(
    private readonly sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) private readonly config: PreviewDialogConfig,
  ) { }
}
