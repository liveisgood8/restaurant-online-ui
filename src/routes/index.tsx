import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import { history } from '../app/store';
import { CartLayout } from '../pages/CartLayout';
import { CartContainer } from '../features/CartContainer';
import { RouteWithLayout } from './RouteWithLayout';
import { AdminLayout } from '../pages/AdminLayout';
import { RoutePath } from './paths';
import { AdminMenuContainer } from '../features/AdminMenuContainer';
import { LoginPage } from '../pages/Login';
import { RegistrationPage } from '../pages/RegistrationPage';
import { ProfileContainer } from '../features/ProfileContainer';
import { HomePage } from '../pages/Home';

export const Routes: React.SFC = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path={RoutePath.LOGIN} component={LoginPage} />
        <Route exact path={RoutePath.REGISTRATION} component={RegistrationPage} />
        <RouteWithLayout layout={CartLayout} exact path={RoutePath.HOME} component={HomePage} />
        <RouteWithLayout layout={CartLayout} exact path={RoutePath.PROFILE} component={ProfileContainer} />
        <RouteWithLayout layout={CartLayout} exact path={RoutePath.CART} component={CartContainer} />
        <RouteWithLayout layout={AdminLayout} exact path={RoutePath.ADMIN_DISH_MENU}
          component={AdminMenuContainer} />
      </Switch>
    </ConnectedRouter>
  )
};