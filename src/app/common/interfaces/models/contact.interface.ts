import { IUser } from '@app/common';

export interface IContact {
  assigneeId?: string;
  assignee?: IUser;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
}
