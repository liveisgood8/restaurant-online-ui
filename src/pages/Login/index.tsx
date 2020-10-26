import './styles.scss';

import React from 'react';
import { LoginForm } from './LoginForm';
import { IAuthRequestBody } from '../../api/payloads/auth';
import { CenteredContainer } from '../../components/core/CenteredContainer';
import { useDispatch } from 'react-redux';
import { login } from '../../app/auth/actions';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../routes/paths';
import { Logo } from '../../components/Logo';

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch();

  const onLogin = async (data: IAuthRequestBody): Promise<void> => {
    dispatch(login(data));
  };

  return (
    <CenteredContainer centerVertically className="mt-5">
      <Link className="text-decoration-none d-flex justify-content-center mb-4" to={RoutePath.HOME}>
        <Logo />
      </Link>
      <LoginForm
        onSubmit={onLogin}
      />
    </CenteredContainer>
  );
};
