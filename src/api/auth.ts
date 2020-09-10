import { WithoutId } from '../types/utils'
import { AxiosInstance } from '../helpers/axios-instance';
import { IAuthRequestBody, IAuthTokenResponseBody } from './payloads/auth';

export const AuthApi = {
  auth: async (data: IAuthRequestBody): Promise<IAuthTokenResponseBody> => {
    const response = await AxiosInstance.post<IAuthTokenResponseBody>('/auth', data);
    return response.data;
  },

  registration: async (user: WithoutId<IUser>): Promise<IUser> => {
    const response = await AxiosInstance.post<IUser>(`/auth/registration`, user);
    return response.data;
  }
}

export interface IUser {
  id: number;
  login: string;
  password: string;
  name?: string;
  surname?: string;
}
