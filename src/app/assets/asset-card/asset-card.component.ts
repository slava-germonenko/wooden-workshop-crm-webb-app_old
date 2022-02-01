/* eslint-disable no-underscore-dangle */
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

import { AssetsHelper } from '@common/helpers';
import { IAsset } from '@common/interfaces';
import { isAssetFileType, isImageAssetFileType } from '@common/type-guards';

@Component({
  selector: 'ww-asset-card',
  templateUrl: 'asset-card.component.html',
  styleUrls: ['asset-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetCardComponent {
  @HostBinding('class')
  public hostClasses = ['mat-border'];

  @Input()
  public selected = false;

  @Input()
  public set asset(asset: IAsset) {
    this._asset = asset;
    this.setAssetThumbnailAndType(asset);
  }

  public imageIsPlaceholder = true;

  public fileTypeThumbnail: string | null = null;

  public previewImageUrl: string | null = null;

  public _asset: IAsset | null = null;

  private setAssetThumbnailAndType(asset: IAsset): void {
    const fileExt = asset.url?.split('.')?.pop();
    if (!isAssetFileType(fileExt)) {
      throw new Error(`${fileExt} files are not supported.`);
    }
    if (isImageAssetFileType(fileExt) && asset.url) {
      this.previewImageUrl = asset.url;
      this.imageIsPlaceholder = false;
    } else {
      this.previewImageUrl = AssetsHelper.getAssetIconImageUrl(fileExt);
    }

    this.fileTypeThumbnail = AssetsHelper.getAssetIconImageUrl(fileExt);
  }
}
