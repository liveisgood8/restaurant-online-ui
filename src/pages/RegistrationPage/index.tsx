import React from 'react';
import { IUser, AuthApi } from '../../api/auth';
import { UserDataForm } from './UserDataForm';
import { WithoutId } from '../../types/utils';

export const RegistrationPage: React.SFC = () => {
  const onRegistration = async (user: WithoutId<IUser>): Promise<void> => {
    AuthApi.registration(user);
  };

  return (
    <div>
      <UserDataForm 
        onSubmit={onRegistration}
      />
    </div>
  )
};
