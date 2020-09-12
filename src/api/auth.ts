import { AxiosInstance } from '../helpers/axios-instance';
import { IAuthRequestBody, IRegistrationRequestBody } from './payloads/auth';

export const AuthApi = {
  auth: async (data: IAuthRequestBody): Promise<IAuthInfo> => {
    const response = await AxiosInstance.post<IAuthInfo>('/auth', data);
    return response.data;
  },

  registration: async (registrationRequest: IRegistrationRequestBody): Promise<IUser> => {
    const response = await AxiosInstance.post<IUser>(`/auth/registration`, registrationRequest);
    return response.data;
  }
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  name?: string;
  surname?: string;
  bonuses: number;
}

export type IUserMinimalInfo = Pick<IUser, 'id' | 'email' | 'name' | 'surname' | 'bonuses'>;

export interface IAuthInfo {
  accessToken: string;
  userInfo: IUserMinimalInfo; 
}
