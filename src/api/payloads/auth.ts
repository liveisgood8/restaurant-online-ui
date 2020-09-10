export interface IAuthRequestBody {
  login: string;
  password: string;
}

export interface IAuthTokenResponseBody {
  accessToken: string;
}