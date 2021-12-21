export interface IAuthorizationResult {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}
