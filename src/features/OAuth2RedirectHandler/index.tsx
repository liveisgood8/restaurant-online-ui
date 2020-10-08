import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BooleanParam, StringParam, useQueryParam } from 'use-query-params';
import { loginByOAuth2 } from '../../app/auth/actions';
import { CenteredContainer } from '../../components/core/CenteredContainer';

export const OAuth2RedirectHandler: React.FC = () => {
  const dispatch = useDispatch();
  const [token] = useQueryParam('token', StringParam);
  const [isCredentialsExpired] = useQueryParam('isCredentialsExpired', BooleanParam);

  useEffect(() => {
    if (token && isCredentialsExpired != null) {
      dispatch(loginByOAuth2(token, isCredentialsExpired));
    }
  }, [token, isCredentialsExpired]);

  return (
    <CenteredContainer className="mt-5" centerVertically>
      <p>Входим в аккаунт через сторонний сервис...</p>
    </CenteredContainer>
  );
};
