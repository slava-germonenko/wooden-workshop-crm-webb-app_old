import {
  ALLOWED_ASSET_FILE_EXTENSIONS,
  ALLOWED_DOCUMENT_FILE_EXTENSIONS,
  ALLOWED_IMAGE_FILE_EXTENSIONS,
} from '@common/constants';

export type AssetFileType = typeof ALLOWED_ASSET_FILE_EXTENSIONS[number];

export type ImageAssetFileType = typeof ALLOWED_IMAGE_FILE_EXTENSIONS[number];

export type DocumentAssetFileType = typeof ALLOWED_DOCUMENT_FILE_EXTENSIONS[number];
