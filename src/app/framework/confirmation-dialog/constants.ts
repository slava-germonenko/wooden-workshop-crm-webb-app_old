import { IConfirmationDialogConfiguration } from './confirmation-dialog-configuration.interface';

export const BASE_CONFIRMATION_DIALOG_CONFIG: IConfirmationDialogConfiguration = {
  title: 'Подтвержедение действия',
  question: 'Вы действительно хотите продолжить',
  termsList: [],
  cancelButtonText: 'Отмена',
  confirmButtonText: 'Подтвердить',
  showCancelButton: true,
  showTitle: true,
};
