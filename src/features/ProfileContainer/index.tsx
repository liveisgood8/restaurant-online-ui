import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { IUserMinimalInfo } from '../../api/auth';
import { logout, setUserInfo } from '../../app/auth/actions';
import { RootState } from '../../app/store';
import { CenteredContainer } from '../../components/core/CenteredContainer';
import { IUserData, UserDataForm } from '../../components/UserDataForm/UserDataForm';

export const ProfileContainer: React.FC = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const onUpdateInfo = (newUserData: IUserData): void => {
    console.log(userInfo);
    dispatch(setUserInfo({
      ...userInfo,
      ...newUserData,
    } as IUserMinimalInfo));
  };

  const onExit = (): void => {
    dispatch(logout());
  };

  const ExitButton = (
    <Button
      className="ml-auto"
      variant="outline-danger"
      onClick={onExit}
    >
      Выйти
    </Button>
  )

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
  )
};