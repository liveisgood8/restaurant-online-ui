import { AxiosInstance } from '../helpers/axios-instance';
import { PartialWithoutId } from '../types/utils';
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
    newInfo: PartialWithoutId<Omit<IUser, 'email' | 'phone' |'bonuses'>>,
  ): Promise<IUserMinimalInfo> => {
    const { data } = await AxiosInstance.patch<IUserMinimalInfo>('/auth/user-info', newInfo);
    return data;
  },
};

export interface IUser {
  id: number;
  phone: string;
  email: string;
  password: string;
  name?: string;
  bonuses: number;
  authorities: string[];
}

export type IUserMinimalInfo = Pick<IUser, 'id' | 'phone' | 'email' | 'name' | 'bonuses' | 'authorities'>;

export interface IAuthInfo {
  accessToken: string;
  userInfo: IUserMinimalInfo;
}
