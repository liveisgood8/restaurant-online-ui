import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { setAccessToken, setUserInfo } from './app/auth/actions';
import { getAuthInfo } from './app/auth/utils';
import { Routes } from './routes';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authInfo = getAuthInfo();
    if (authInfo) {
      dispatch(setAccessToken(authInfo.accessToken));
      dispatch(setUserInfo(authInfo.userInfo));
    }
  }, [dispatch]);

  return (
    <React.Fragment>
      <Routes />
      <ToastContainer
        autoClose={3000}
        position="bottom-center"
      />
    </React.Fragment>
  );
};

export default App;
