import { Permissions } from '@common/enums';

export interface IButton {
  name: string;
  label?: string;
  icon?: string;
  link?: string;
  permission?: Permissions[];
  click?(): void;
}
