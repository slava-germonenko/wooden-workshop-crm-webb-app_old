export const ALLOWED_IMAGE_FILE_EXTENSIONS = [
  'jpg',
  'jpeg',
  'png',
  'svg',
] as const;

export const ALLOWED_DOCUMENT_FILE_EXTENSIONS = [
  'doc',
  'docx',
  'pdf',
  'xls',
  'xlsx',
] as const;

export const ALLOWED_ASSET_FILE_EXTENSIONS = [
  'txt',
  ...ALLOWED_DOCUMENT_FILE_EXTENSIONS,
  ...ALLOWED_IMAGE_FILE_EXTENSIONS,
] as const;
