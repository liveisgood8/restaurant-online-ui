import React, { useState } from 'react';
import {  AuthApi } from '../../api/auth';
import { IUserData, UserDataForm } from '../../components/UserDataForm/UserDataForm';
import { IRegistrationRequestBody } from '../../api/payloads/auth';
import { Redirect } from 'react-router-dom';
import { RoutePath } from '../../routes/paths';
import { CenteredContainer } from '../../components/core/CenteredContainer';

export const RegistrationPage: React.FC = () => {
  const [isRegistered, setRegistered] = useState(false);

  const onRegistration = async (userData: IUserData): Promise<void> => {
    if (!userData.password) {
      throw new Error('Password must be filled on registration');
    }

    await AuthApi.registration(userData as IRegistrationRequestBody);
    setRegistered(true);
  };

  if (isRegistered) {
    return (
      <Redirect to={RoutePath.LOGIN} />
    )
  }

  return (
    <CenteredContainer centerVertically>
      <UserDataForm
        submitButtonText="Регистрация"
        isPasswordRequired
        onSubmit={onRegistration}
      />
    </CenteredContainer>
  )
};
