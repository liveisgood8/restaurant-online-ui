import React, { useState } from 'react';
import { IAuthRequestBody } from '../../api/payloads/auth';
import { Form } from 'react-bootstrap';
import { TextInput } from '../../components/core/TextInput';
import { Button } from '../../components/core/Button';
import { Link } from 'react-router-dom';
import { Icons } from '../../components/core/icons/icons';
import { OAuth2Url } from '../../config';
import { RoutePath } from '../../routes/paths';

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
    <div className="login-form-wrapper">
      <div className="text-center">
        <p className="mb-1 ro-font-medium-base">Вход в аккаунт</p>
        <p className="ro-font-thin-small">
          Для входа в аккаунт введите свои
          <br />
          учетные данные или войдите через
          <br />
          сторонний сервис
        </p>
      </div>
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
      <div className="mt-4 text-center">
        <span>Нет аккаунта?</span>
        <Link className="ml-2 text-primary" to={RoutePath.REGISTRATION}>Зарегистрироваться</Link>
      </div>
      <div className="text-center">
        <span className="ro-font-light-small">или</span>
      </div>
      <div className="d-flex flex-column align-items-center mt-1">
        <a href={OAuth2Url.VK}>
          <Button
            className="oauth2-button"
            text="Войти через Vk"
            variant="default"
            leftIcon={Icons.VK}
          />
        </a>
        <a href={OAuth2Url.GOOGLE}>
          <Button
            className="oauth2-button mt-3"
            text="Войти через Google"
            variant="default"
            leftIcon={Icons.GOOGLE}
          />
        </a>
        <a href={OAuth2Url.FACEBOOK}>
          <Button
            className="oauth2-button mt-3"
            text="Войти через Facebook"
            variant="default"
            leftIcon={Icons.FACEBOOK}
          />
        </a>
      </div>
    </div>
  );
};

