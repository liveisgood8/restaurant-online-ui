import { RootState } from '../store';
import { isUserAdmin } from './utils';

export function isAuthSelector(state: RootState): boolean {
  return state.auth.authInfo.isAuthenticated;
}

export function isAdminSelector(state: RootState): boolean {
  return state.auth.userInfo ? isUserAdmin(state.auth.userInfo) : false;
}
