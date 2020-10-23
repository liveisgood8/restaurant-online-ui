import './styles.scss';

import React from 'react';
import { LoginForm } from './LoginForm';
import { IAuthRequestBody } from '../../api/payloads/auth';
import { CenteredContainer } from '../../components/core/CenteredContainer';
import { useDispatch } from 'react-redux';
import { login } from '../../app/auth/actions';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../routes/paths';
import { OAuth2Url } from '../../config';
import { Button } from '../../components/core/Button';
import { Icons } from '../../components/core/icons/icons';

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch();

  const onLogin = async (data: IAuthRequestBody): Promise<void> => {
    dispatch(login(data));
  };

  return (
    <CenteredContainer centerVertically className="mt-5">
      <Link className="ro-font-medium-big text-center text-decoration-none text-dark d-block mb-3" to={RoutePath.HOME}>
        Ресторан
      </Link>
      <LoginForm
        onSubmit={onLogin}
      />
      <div className="mt-4 text-center">
        <span>Нет аккаунта?</span>
        <Link className="ml-2 text-primary" to={RoutePath.REGISTRATION}>Зарегестрироваться</Link>
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
    </CenteredContainer>
  );
};
