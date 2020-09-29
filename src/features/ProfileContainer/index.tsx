import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUserInfoThunk } from '../../app/auth/actions';
import { RootState } from '../../app/store';
import { Button } from '../../components/core/Button';
import { CenteredContainer } from '../../components/core/CenteredContainer';
import { IUserData, UserDataForm } from '../../components/UserDataForm/UserDataForm';

export const ProfileContainer: React.FC = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const onUpdateInfo = (newUserData: IUserData): void => {
    dispatch(updateUserInfoThunk({
      name: newUserData.name,
      password: newUserData.password,
    }));
  };

  const onExit = (): void => {
    dispatch(logout());
  };

  const ExitButton = (
    <Button
      text="Выйти"
      className="mt-3 align-self-center"
      variant="danger"
      onClick={onExit}
    />
  );

  return (
    <CenteredContainer>
      <UserDataForm
        additionalButtons={ExitButton}
        userInfo={userInfo}
        submitButtonText="Обновить данные"
        isEmailEditDisabled
        onSubmit={onUpdateInfo}
      />
    </CenteredContainer>
  );
};
