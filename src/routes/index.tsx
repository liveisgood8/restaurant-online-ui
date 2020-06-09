import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';
import { history } from '../app/store';
import App from '../App';
import { CartLayout } from '../pages/CartLayout';
import { CartContainer } from '../features/CartContainer';
import { RouteWithLayout } from './RouteWithLayout';
import { AdminLayout } from '../pages/AdminLayout';
import { RoutePath } from './paths';
import { AdminMenuContainer } from '../features/AdminMenuContainer';

export const Routes: React.SFC = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <RouteWithLayout layout={CartLayout} exact path={RoutePath.HOME} component={App} />
        <RouteWithLayout layout={CartLayout} exact path={RoutePath.CART} component={CartContainer} />
        <RouteWithLayout layout={AdminLayout} exact path={RoutePath.ADMIN_DISH_MENU}
          component={AdminMenuContainer} />
      </Switch>
    </ConnectedRouter>
  )
};