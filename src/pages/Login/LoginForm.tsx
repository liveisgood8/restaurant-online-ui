import React, { useState } from 'react';
import { IAuthRequestBody } from '../../api/payloads/auth';
import { Form } from 'react-bootstrap';
import { TextInput } from '../../components/core/TextInput';
import { Button } from '../../components/core/Button';
import { Link } from 'react-router-dom';
import { OAuth2Url } from '../../config';

interface ILoginForm {
  onSubmit: (data: IAuthRequestBody) => void;
}

export const LoginForm: React.FC<ILoginForm> = ({ onSubmit: onSubmitProp }) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!login || !password) {
      return;
    }

    onSubmitProp({
      login,
      password,
    });
  };

  return (
    <div>
      <Form className="d-flex flex-column" onSubmit={onSubmit}>
        <TextInput
          className="mb-3"
          required
          value={login}
          placeholder="Адрес эл. почты или телефон"
          onChange={setLogin}
        />
        <TextInput
          className="mb-3"
          required
          type="password"
          value={password}
          placeholder="Пароль"
          onChange={setPassword}
        />
        <Button
          className="align-self-center"
          type="submit"
          text="Вход"
        />
      </Form>
      <div>
        <a href={OAuth2Url.VK}>
          <div>
            <span>Войти через VK</span>
          </div>
        </a>
        <a href={OAuth2Url.GOOGLE}>
          <div>
            <span>Войти через Google</span>
          </div>
        </a>
        <a href={OAuth2Url.FACEBOOK}>
          <div>
            <span>Войти через Facebook</span>
          </div>
        </a>
      </div>
    </div>
  );
};

