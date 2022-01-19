import { AssetFileType } from '@common/types';

export class AssetsHelper {
  public static getAssetIconImageUrl(fileExt: AssetFileType): string {
    return `assets/file-type-icons/${fileExt}.png`;
  }
}
