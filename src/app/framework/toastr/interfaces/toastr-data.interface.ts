import { ToastrAction, ToastrSeverity } from '../types';

export interface IToastrData {
  message: string;
  severity: ToastrSeverity;
  action?: ToastrAction,
}
