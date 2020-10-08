import { RoutePath } from './paths';

export function makeOAuth2RedirectUrl(): string {
  return window.location.origin + RoutePath.OAUTH2_REDIRECT;
}
