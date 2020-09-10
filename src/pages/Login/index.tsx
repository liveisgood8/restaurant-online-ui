import React, { Fragment } from 'react';
import { LoginForm } from './LoginForm';
import { IAuthRequestBody } from '../../api/payloads/auth';
import { AuthApi } from '../../api/auth';

export const LoginPage: React.SFC = () => {
  const onLogin = async (data: IAuthRequestBody): Promise<void> => {
    AuthApi.auth(data);
  }
  
  return (
    <div>
      <LoginForm
        onSubmit={onLogin}
      />
    </div>
  );
};
