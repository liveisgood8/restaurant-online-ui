import React, { useEffect } from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { setAccessToken, setUserInfo } from './app/auth/actions';
import { getAuthInfo } from './app/auth/utils';
import { Routes } from './routes';

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 1,
    },
  },
});


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
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Routes />
        <ToastContainer
          autoClose={3000}
          position="bottom-center"
        />
      </ReactQueryCacheProvider>
    </React.Fragment>
  );
};

export default App;
