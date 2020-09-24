import React, { useState } from 'react';
import { AuthApi } from '../../api/auth';
import { IUserData, UserDataForm } from '../../components/UserDataForm/UserDataForm';
import { IRegistrationRequestBody } from '../../api/payloads/auth';
import { Redirect } from 'react-router-dom';
import { RoutePath } from '../../routes/paths';
import { CenteredContainer } from '../../components/core/CenteredContainer';
import { handleError } from '../../errors/handler';

export const RegistrationPage: React.FC = () => {
  const [isRegistered, setRegistered] = useState(false);

  const onRegistration = async (userData: IUserData): Promise<void> => {
    if (!userData.password) {
      throw new Error('Password must be filled on registration');
    }

    try {
      await AuthApi.registration(userData as IRegistrationRequestBody);
      setRegistered(true);
    } catch (err) {
      handleError(err, 'Упс, произошла ошибка при регистрации');
    }
  };

  if (isRegistered) {
    return (
      <Redirect to={RoutePath.LOGIN} />
    );
  }

  return (
    <CenteredContainer centerVertically>
      <UserDataForm
        submitButtonText="Регистрация"
        isPasswordRequired
        onSubmit={onRegistration}
      />
    </CenteredContainer>
  );
};
