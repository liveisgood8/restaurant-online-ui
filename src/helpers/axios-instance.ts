import Axios from 'axios';
import { apiUrl } from '../config';
import { authService } from '../services/auth-service';

interface IBearerAuthorizationHeader {
  Authorization?: string;
}

export function getBearerAuthorizationHeader(): IBearerAuthorizationHeader {
  const authInfo = authService.getAuthInfo();
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