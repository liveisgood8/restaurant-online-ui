import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { IRegistrationRequestBody } from '../../api/payloads/auth';

interface IRegistrationForm {
  onSubmit: (registrationRequest: IRegistrationRequestBody) => void;
}

const validatePassword = (password: string, passwordConfirm: string): boolean => {
  if (!password && !passwordConfirm) {
    return true;
  }
  return Boolean(passwordConfirm) && password === passwordConfirm;
};

export const UserDataForm: React.FC<IRegistrationForm> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [isPasswordEquals, setPasswordEquals] = useState(true);

  const isDataFilled = (): boolean => {
    return email !== '' && password !== '' && isPasswordEquals;
  }

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
    <Form onSubmit={onSubmitForm}>
      <Form.Group>
        <Form.Label>Почтовый адрес</Form.Label>
        <Form.Control
          required
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmail(e.currentTarget.value)}
        />
      </Form.Group>
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
          <span>Пароли не совпадают</span>
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
      <Button 
        type="submit" 
        variant="success"
        disabled={!isDataFilled()}
      >
        Зарегистрироваться
      </Button>
    </Form>
  );
};
