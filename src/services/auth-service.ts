import { IAuthRequestBody } from '../api/payloads/auth';
import { AxiosInstance } from '../helpers/axios-instance';
import { IAuthToken } from '../api/auth';

const localStorageDataKey = 'authData';

class AuthService {

  public async auth(data: IAuthRequestBody): Promise<IAuthToken> {
    const response = await AxiosInstance.post<IAuthToken>('/auth', data);
    localStorage.setItem(localStorageDataKey, JSON.stringify(response.data));
    return response.data;
  }

  public getAccessToken(): string | null {
    const rawData = localStorage.getItem(localStorageDataKey);
    if (!rawData) {
      return null;
    }

    const authData = JSON.parse(rawData) as IAuthToken;
    return authData.accessToken;
  }

  public isAuthenticated(): boolean {
    return this.getAccessToken() != null;
  }

}

export const authService = new AuthService();

