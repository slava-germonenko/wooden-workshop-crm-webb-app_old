import { IConfirmationDialogConfiguration } from './confirmation-dialog-configuration.interface';

export const BASE_CONFIRMATION_DIALOG_CONFIG: IConfirmationDialogConfiguration = {
  title: 'Подтвержедение действия',
  description: 'Вы действительно хотите продолжить',
  cancelButtonText: 'Отмена',
  confirmButtonText: 'Подтвердить',
  showCancelButton: true,
  showTitle: true,
};
