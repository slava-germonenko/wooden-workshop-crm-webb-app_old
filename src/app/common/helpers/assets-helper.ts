import { IAsset } from '@common/interfaces';
import { AssetFileType } from '@common/types';
import { isAssetFileType } from '@common/type-guards';

export class AssetsHelper {
  public static getAssetIconImageUrl(fileExt: AssetFileType): string {
    return `assets/file-type-icons/${fileExt}.png`;
  }

  public static getAssetFileType({ url }: Pick<IAsset, 'url'>): AssetFileType | null {
    if (!url) {
      return null;
    }

    const fileExt = url.split('.').pop();
    return isAssetFileType(fileExt) ? fileExt : null;
  }
}
