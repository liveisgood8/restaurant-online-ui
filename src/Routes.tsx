import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import { history } from './app/store';
import App from './App';
import { Layout } from './pages/Layout';
import { CartContainer } from './features/CartContainer';

export enum RoutePath {
  HOME = '/',
  CART = '/cart',
}

export const Routes: React.SFC = () => {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Switch>
          <Route exact path={RoutePath.HOME} component={App} />
          <Route exact path={RoutePath.CART} component={CartContainer} />
        </Switch>
      </Layout>
    </ConnectedRouter>
  )
};