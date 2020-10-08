import './styles.scss';
import { ReactComponent as VkIcon } from './vk.svg';
import { ReactComponent as GoogleIcon } from './google.svg';
import { ReactComponent as FacebookIcon } from './facebook.svg';

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
        <Link className="ml-2" to={RoutePath.REGISTRATION}>Зарегистрируйтесь</Link>
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
            leftIcon={VkIcon}
          />
        </a>
        <a href={OAuth2Url.GOOGLE}>
          <Button
            className="oauth2-button mt-3"
            text="Войти через Google"
            variant="default"
            leftIcon={GoogleIcon}
          />
        </a>
        <a href={OAuth2Url.FACEBOOK}>
          <Button
            className="oauth2-button mt-3"
            text="Войти через Facebook"
            variant="default"
            leftIcon={FacebookIcon}
          />
        </a>
      </div>
    </CenteredContainer>
  );
};
