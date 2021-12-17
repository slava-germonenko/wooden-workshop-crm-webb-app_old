import { Permissions } from '@common/enums';

export interface IButton {
  name: string;
  label?: string;
  icon?: string;
  link?: string;
  permissions?: Permissions[];
  click?(): void;
}
