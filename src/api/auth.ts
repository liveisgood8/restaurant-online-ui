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
  },

  updateInfo: async (
    newInfo: IUser,
  ): Promise<IUser> => {
    const { data } = await AxiosInstance.put<IUser>('/auth/user', newInfo);
    return data;
  },
};

export interface IUser {
  id: number;
  phone?: string;
  email: string;
  password?: string;
  name: string;
  bonuses: number;
  authorities: string[];
}

export interface IAuthInfo {
  accessToken: string;
  userInfo: IUser;
}
