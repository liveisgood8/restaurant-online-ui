import Axios from 'axios';
import { getAuthInfo } from '../app/auth/utils';
import { apiUrl } from '../config';

interface IBearerAuthorizationHeader {
  Authorization?: string;
}

export function getBearerAuthorizationHeader(): IBearerAuthorizationHeader {
  const authInfo = getAuthInfo();
  if (!authInfo) {
    return {};
  }
  return {
    Authorization: 'Bearer ' + authInfo.accessToken,
  };
}

export const AxiosInstance = Axios.create({
  baseURL: apiUrl,
  headers: {
    ...getBearerAuthorizationHeader(),
  },
});