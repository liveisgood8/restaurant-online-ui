import { apiUrl } from '../config';

export function relativeUrlToAbsolute(url: string): string {
  return apiUrl + url;
}
