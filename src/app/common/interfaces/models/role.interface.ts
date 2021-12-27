import { Permissions } from '@common/enums';

export interface IRole {
  id: string;
  name: string;
  assigneeCount: string;
  permissions: Permissions[];
}
