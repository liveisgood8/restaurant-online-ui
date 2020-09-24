export interface IAuthRequestBody {
  login: string; // Email or phone number
  password: string;
}

export interface IRegistrationRequestBody {
  phone: string;
  email: string;
  password: string;
  name?: string;
}
