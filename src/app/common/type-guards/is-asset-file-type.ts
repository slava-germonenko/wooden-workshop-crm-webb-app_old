import { AssetFileType, DocumentAssetFileType, ImageAssetFileType } from '@common/types';
import {
  ALLOWED_ASSET_FILE_EXTENSIONS,
  ALLOWED_DOCUMENT_FILE_EXTENSIONS,
  ALLOWED_IMAGE_FILE_EXTENSIONS,
} from '@common/constants';

export function isAssetFileType(fileType: unknown): fileType is AssetFileType {
  if (typeof fileType !== 'string') {
    return false;
  }
  return ALLOWED_ASSET_FILE_EXTENSIONS.some((ext) => fileType === ext);
}

export function isDocumentAssetFileType(fileType: unknown): fileType is DocumentAssetFileType {
  if (typeof fileType !== 'string') {
    return false;
  }
  return ALLOWED_DOCUMENT_FILE_EXTENSIONS.some((type) => fileType === type);
}

export function isImageAssetFileType(fileType: unknown): fileType is ImageAssetFileType {
  if (typeof fileType !== 'string') {
    return false;
  }
  return ALLOWED_IMAGE_FILE_EXTENSIONS.some((type) => fileType === type);
}
