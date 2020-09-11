export interface IAuthRequestBody {
  email: string;
  password: string;
}

export interface IRegistrationRequestBody {
  email: string;
  password: string;
  name?: string;
  surname?: string;
}