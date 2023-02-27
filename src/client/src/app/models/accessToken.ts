export interface AccessToken {
  token: string;
  type: string;
  expiresIn: number;
  refreshToken: string;
  validUntil: string;
}
