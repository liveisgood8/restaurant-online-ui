import { IAuthInfo, IUser } from '../../api/auth';

const localStorageDataKey = 'authData';

export function setAuthInfo(info: IAuthInfo | null): void {
  if (!info) {
    localStorage.removeItem(localStorageDataKey);
  } else {
    localStorage.setItem(localStorageDataKey, JSON.stringify(info));
  }
}

export function getAuthInfo(): IAuthInfo | null {
  const rawData = localStorage.getItem(localStorageDataKey);
  if (!rawData) {
    return null;
  }

  const authInfo = JSON.parse(rawData) as IAuthInfo;
  return authInfo;
}

export function isUserAdmin(userInfo: IUser): boolean {
  return userInfo.authorities.indexOf('ADMIN') !== -1;
}
