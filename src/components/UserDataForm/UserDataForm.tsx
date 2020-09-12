import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { IUserMinimalInfo } from '../../api/auth';

export interface IUserData {
  email: string;
  password?: string;
  name?: string;
  surname?: string;
}

interface IRegistrationFormProps {
  className?: string;
  additionalButtons?: React.ReactElement;
  userInfo?: IUserMinimalInfo | null;
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
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const UserDataForm: React.FC<IRegistrationFormProps> = ({
  className,
  additionalButtons,
  userInfo,
  submitButtonText, 
  isEmailEditDisabled,
  isPasswordRequired,
  onSubmit,
 }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [isEmailInvalid, setEmailInvalid] = useState(false);
  const [isPasswordEquals, setPasswordEquals] = useState(true);

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
      setSurname(userInfo.surname);
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
  }

  const onEmailChange = (newEmail: string) => {
    if (newEmail) {
      setEmailInvalid(!emailRegex.test(newEmail));
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
      email,
      password,
      name,
      surname,
    });
  };

  return (
    <Form className={className} onSubmit={onSubmitForm}>
      <Form.Group>
        <Form.Label>Почтовый адрес</Form.Label>
        <Form.Control
          required
          disabled={isEmailEditDisabled}
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => onEmailChange(e.currentTarget.value)}
        />
      </Form.Group>
      {isEmailInvalid && (
        <Form.Group>
          <span className="text-danger font-smaller font-weight-light">Некорректный адрес</span>
        </Form.Group>
      )}
      <Form.Group>
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          required
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => onPasswordChange(e.currentTarget.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Подтверждение пароля</Form.Label>
        <Form.Control
          required
          type="password"
          value={passwordConfirm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => onPasswordConfirmChange(e.currentTarget.value)}
        />
      </Form.Group>
      {!isPasswordEquals && (
        <Form.Group>
          <span className="text-danger font-smaller font-weight-light">Пароли не совпадают</span>
        </Form.Group>
      )}
      <Form.Group>
        <Form.Label>Имя</Form.Label>
        <Form.Control
          value={name || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setName(e.currentTarget.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Фамилия</Form.Label>
        <Form.Control
          value={surname || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setSurname(e.currentTarget.value)}
        />
      </Form.Group>
      <div className="d-flex">
        <Button
          type="submit" 
          variant="success"
          disabled={!isDataFilled()}
          >
          {submitButtonText}
        </Button>
        {additionalButtons}
      </div>
    </Form>
  );
};
