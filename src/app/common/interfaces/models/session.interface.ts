export interface ISession {
  id: string;
  deviceName?: string;
  ipAddress?: string;
  expireDate: Date;
  refreshToken: string;
  userId: string;
}
