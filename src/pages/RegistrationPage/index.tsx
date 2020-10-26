import React, { useState } from 'react';
import { AuthApi } from '../../api/auth';
import { IUserData, UserDataForm } from '../../components/UserDataForm/UserDataForm';
import { IRegistrationRequestBody } from '../../api/payloads/auth';
import { Link, Redirect } from 'react-router-dom';
import { RoutePath } from '../../routes/paths';
import { CenteredContainer } from '../../components/core/CenteredContainer';
import { handleError } from '../../errors/handler';
import { EmojiType } from '../../helpers/emoji/emoji-type';
import { emojify } from '../../helpers/emoji/emoji-messages';
import { Logo } from '../../components/Logo';

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
      handleError(err, emojify('Упс, произошла ошибка при регистрации', EmojiType.SAD));
    }
  };

  if (isRegistered) {
    return (
      <Redirect to={RoutePath.LOGIN} />
    );
  }

  return (
    <CenteredContainer className="mt-5" centerVertically>
      <Link className="text-decoration-none d-flex justify-content-center mb-4" to={RoutePath.HOME}>
        <Logo />
      </Link>
      <UserDataForm
        submitButtonText="Регистрация"
        isPasswordRequired
        onSubmit={onRegistration}
      />
    </CenteredContainer>
  );
};
