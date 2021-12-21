import { MatSnackBarConfig } from '@angular/material/snack-bar';

import { ToastrSeverity } from './types';

export const BASE_CONFIG: Partial<MatSnackBarConfig> = {
  duration: 5000,
  horizontalPosition: 'center',
  verticalPosition: 'bottom',
};

export const SEVERITY_CLASSES: Record<ToastrSeverity, string> = {
  error: 'error-alert',
  warning: 'warning-alert',
  info: 'info-alert',
  success: 'success-alert',
};

export const SEVERITY_ICONS: Record<ToastrSeverity, string> = {
  error: 'error_outline',
  warning: 'warning_amber',
  info: 'info',
  success: 'check_circle',
};
