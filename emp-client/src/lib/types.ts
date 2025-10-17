export interface LoginServerResponse {
  userId: number;
  access_token: string;
}

export interface ApiErrorResponse {
  message: string;
  status?: number;
}
