import { IUser } from '@common/interfaces/models';

export interface IContact {
  assigneeId?: string;
  assignee?: IUser;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
}
