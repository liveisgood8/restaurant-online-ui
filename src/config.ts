import { RoutePath } from './routes/paths';
import { makeOAuth2RedirectUrl } from './routes/utils';

export const apiUrl = 'http://192.168.0.101:10100/api/v1';

export const OAuth2Url = {
  VK: apiUrl + '/oauth2/authorize/vk?redirect_uri=' + makeOAuth2RedirectUrl(),
  GOOGLE: apiUrl + '/oauth2/authorize/google?redirect_uri=' + makeOAuth2RedirectUrl(),
  FACEBOOK: apiUrl + '/oauth2/authorize/facebook?redirect_uri=' + makeOAuth2RedirectUrl(),
};
