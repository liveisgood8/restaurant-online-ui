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
import { OrderConfirmationPage } from '../pages/OrderConfirmation';
import { QueryParamProvider } from 'use-query-params';
import { OAuth2RedirectHandler } from '../features/OAuth2RedirectHandler';
import { AdminOrdersApprovalContainer } from '../features/AdminOrdersApprovalContainer';
import { AdminAnalyticsContainer } from '../features/AdminAnalyticsContainer';

export const Routes: React.FC = () => {
  return (
    <ConnectedRouter history={history}>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Switch>
          <Route exact path={RoutePath.LOGIN} component={LoginPage} />
          <Route exact path={RoutePath.REGISTRATION} component={RegistrationPage} />
          <Route path={RoutePath.OAUTH2_REDIRECT} component={OAuth2RedirectHandler} />
          <RouteWithLayout layout={CartLayout} exact path={RoutePath.HOME} component={HomePage} />
          <RouteWithLayout layout={CartLayout} exact path={RoutePath.PROFILE} component={ProfileContainer} />
          <RouteWithLayout layout={CartLayout} exact path={RoutePath.CART} component={CartContainer} />
          <RouteWithLayout layout={CartLayout} exact path={RoutePath.ORDER_CONFIRMATION}
            component={OrderConfirmationPage} />
          <RouteWithLayout layout={AdminLayout} exact path={RoutePath.ADMIN_DISH_MENU}
            component={AdminMenuContainer} />
          <RouteWithLayout layout={AdminLayout} exact path={RoutePath.ADMIN_ORDERS_CONFIRMATION}
            component={AdminOrdersApprovalContainer} />
          <RouteWithLayout layout={AdminLayout} exact path={RoutePath.ADMIN_ANALYTICS}
            component={AdminAnalyticsContainer} />
        </Switch>
      </QueryParamProvider>
    </ConnectedRouter>
  );
};
