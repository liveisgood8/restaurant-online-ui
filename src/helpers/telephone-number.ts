// eslint-disable-next-line no-useless-escape
const telephoneRegex = /^((\+7|7|8)+([0-9]){10})$/;

export function isTelephoneNumberValid(telephoneNumber: string): boolean {
  return telephoneRegex.test(telephoneNumber);
}
