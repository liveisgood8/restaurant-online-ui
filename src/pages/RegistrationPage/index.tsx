import React, { useState } from 'react';
import {  AuthApi } from '../../api/auth';
import { UserDataForm } from './UserDataForm';
import { IRegistrationRequestBody } from '../../api/payloads/auth';
import { Redirect } from 'react-router-dom';
import { RoutePath } from '../../routes/paths';

export const RegistrationPage: React.FC = () => {
  const [isRegistered, setRegistered] = useState(false);

  const onRegistration = async (registrationRequest: IRegistrationRequestBody): Promise<void> => {
    await AuthApi.registration(registrationRequest);
    setRegistered(true);
  };

  if (isRegistered) {
    return (
      <Redirect to={RoutePath.LOGIN} />
    )
  }

  return (
    <div>
      <UserDataForm 
        onSubmit={onRegistration}
      />
    </div>
  )
};
