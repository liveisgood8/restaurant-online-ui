import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { IAuthRequestBody } from '../../api/payloads/auth';
import { authService } from '../../services/auth-service';
import { Redirect } from 'react-router-dom';
import { RoutePath } from '../../routes/paths';

export const LoginPage: React.FC = () => {
  const [isAuthenticated, setAuthenticated] = useState(authService.isAuthenticated());

  const onLogin = async (data: IAuthRequestBody): Promise<void> => {
    try {
      await authService.auth(data);
      setAuthenticated(true);
    } catch (ex) {
      console.error(ex);
    }
  }
  
  if (isAuthenticated) {
    return (
      <Redirect to={RoutePath.HOME} />
    );
  }

  return (
    <div>
      <LoginForm
        onSubmit={onLogin}
      />
    </div>
  );
};
