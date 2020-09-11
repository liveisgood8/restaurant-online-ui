import { IAuthRequestBody } from '../api/payloads/auth';
import { AxiosInstance, getBearerAuthorizationHeader } from '../helpers/axios-instance';
import { IAuthInfo } from '../api/auth';

const localStorageDataKey = 'authData';

class AuthService {

  public async auth(data: IAuthRequestBody): Promise<IAuthInfo> {
    const response = await AxiosInstance.post<IAuthInfo>('/auth', data);
    localStorage.setItem(localStorageDataKey, JSON.stringify(response.data));
    AxiosInstance.defaults.headers = {
      ...AxiosInstance.defaults.headers,
      ...getBearerAuthorizationHeader(),
    };
    return response.data;
  }

  public getAuthInfo(): IAuthInfo | null {
    const rawData = localStorage.getItem(localStorageDataKey);
    if (!rawData) {
      return null;
    }

    const authInfo = JSON.parse(rawData) as IAuthInfo;
    return authInfo;
  }

  public isAuthenticated(): boolean {
    return this.getAuthInfo() != null;
  }

}

export const authService = new AuthService();

