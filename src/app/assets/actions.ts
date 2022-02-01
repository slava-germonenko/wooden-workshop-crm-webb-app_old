import { IButton } from '@common/interfaces';
import { Permissions } from '@common/enums';

export const BASE_REMOVE_ACTION: IButton = {
  name: 'remove',
  label: 'Удалить',
  icon: 'delete',
  permissions: [Permissions.Admin, Permissions.Assets, Permissions.RemoveAssets],
};

export const BASE_EDIT_ACTION: IButton = {
  name: 'edit',
  label: 'Редактировать',
  icon: 'drive_file_rename_outline',
  permissions: [Permissions.Admin, Permissions.Assets],
};

export const BASE_DOWNLOAD_ACTION: IButton = {
  name: 'download',
  label: 'Скачать',
  icon: 'file_download',
};

export const BASE_PREVIEW_ACTION: IButton = {
  name: 'preview',
  label: 'Просмотреть',
  icon: 'fullscreen',
};

export const BASE_MOVE_ACTION: IButton = {
  name: 'move',
  label: 'Переместить',
  icon: 'drive_file_move',
  permissions: [Permissions.Admin, Permissions.Assets],
};
