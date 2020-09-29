import React from 'react';
import { LoginForm } from './LoginForm';
import { IAuthRequestBody } from '../../api/payloads/auth';
import { CenteredContainer } from '../../components/core/CenteredContainer';
import { useDispatch } from 'react-redux';
import { login } from '../../app/auth/actions';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../routes/paths';

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
    </CenteredContainer>
  );
};
