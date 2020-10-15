import React, { Fragment, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import cn from 'classnames';
import { IUser } from '../../api/auth';
import { Button } from '../core/Button';
import { TextInput } from '../core/TextInput';

export interface IUserData {
  phone: string;
  email: string;
  password?: string;
  name?: string;
}

interface IRegistrationFormProps {
  className?: string;
  additionalButtons?: React.ReactElement;
  userInfo?: IUser | null;
  submitButtonText: string;
  isEmailEditDisabled?: boolean;
  isPasswordRequired?: boolean;
  onSubmit: (userData: IUserData) => void;
}

const validatePassword = (password: string, passwordConfirm: string): boolean => {
  if (!password && !passwordConfirm) {
    return true;
  }
  return Boolean(passwordConfirm) && password === passwordConfirm;
};

// eslint-disable-next-line no-useless-escape
const phoneRegex = /^((\+7|7|8)+([0-9]){10})$/;
// eslint-disable-next-line no-useless-escape
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const UserDataForm: React.FC<IRegistrationFormProps> = ({
  className,
  additionalButtons,
  userInfo,
  submitButtonText,
  isPasswordRequired,
  onSubmit,
}) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState<string>();
  const [isPhoneInvalid, setPhoneInvalid] = useState(false);
  const [isEmailInvalid, setEmailInvalid] = useState(false);
  const [isPasswordEquals, setPasswordEquals] = useState(true);

  useEffect(() => {
    if (userInfo) {
      setPhone(userInfo.phone || '');
      setEmail(userInfo.email);
      setName(userInfo.name);
    }
  }, [userInfo]);

  const isDataFilled = (): boolean => {
    if (!emailRegex.test(email)) {
      return false;
    }
    if (password || passwordConfirm || isPasswordRequired) {
      return (Boolean(password) || Boolean(passwordConfirm)) && isPasswordEquals;
    }
    return true;
  };

  const onPhoneChange = (newPhone: string) => {
    if (newPhone) {
      setPhoneInvalid(!phoneRegex.test(newPhone));
    } else {
      setPhoneInvalid(false);
    }
    setPhone(newPhone);
  };

  const onEmailChange = (newEmail: string) => {
    if (newEmail) {
      setEmailInvalid(!emailRegex.test(newEmail));
    } else {
      setEmailInvalid(false);
    }
    setEmail(newEmail);
  };

  const onPasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    setPasswordEquals(validatePassword(newPassword, passwordConfirm));
  };

  const onPasswordConfirmChange = (newPasswordConfirm: string) => {
    setPasswordConfirm(newPasswordConfirm);
    setPasswordEquals(validatePassword(password, newPasswordConfirm));
  };

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit({
      phone,
      email,
      password: password === '' ? undefined : password,
      name,
    });
  };

  return (
    <Form className={cn(className, 'd-flex', 'flex-column')} onSubmit={onSubmitForm}>
      {userInfo != null ? (
        <Fragment>
          <div className="align-self-center mb-2 d-flex d-lg-block flex-column align-items-center">
            <span>Ваш номер телефона:</span>
            <span className="d-block d-lg-inline ro-font-regular-base ml-2">{userInfo.phone}</span>
          </div>
          <div className="align-self-center mb-4 d-flex d-lg-block flex-column align-items-center">
            <span>Ваш почтовый адрес:</span>
            <span className="d-block d-lg-inline ro-font-regular-base ml-2">{userInfo.email}</span>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <TextInput
            className="mb-3"
            required
            placeholder="Телефон"
            showWarning={isPhoneInvalid}
            warningText={isPhoneInvalid ? 'Некорректный номер' : undefined}
            value={phone}
            onChange={onPhoneChange}
          />
          <TextInput
            className="mb-3"
            required
            placeholder="Адрес эл. почты"
            showWarning={isEmailInvalid}
            warningText={isEmailInvalid ? 'Некорректный адрес' : undefined}
            type="email"
            value={email}
            onChange={onEmailChange}
          />
        </Fragment>
      )}

      <TextInput
        className="mb-3"
        required={!userInfo}
        placeholder="Пароль"
        type="password"
        value={password}
        onChange={onPasswordChange}
      />
      <TextInput
        className="mb-3"
        required={!userInfo}
        showWarning={!isPasswordEquals}
        warningText={!isPasswordEquals ? 'Пароли не совпадают' : undefined}
        placeholder="Подтверждение пароля"
        type="password"
        value={passwordConfirm}
        onChange={onPasswordConfirmChange}
      />
      <TextInput
        placeholder="Имя"
        className="mb-4"
        value={name || ''}
        onChange={setName}
      />
      <Button
        className="align-self-center"
        disabled={!isDataFilled()}
        type="submit"
        text={submitButtonText}
      />
      {additionalButtons}
    </Form>
  );
};
