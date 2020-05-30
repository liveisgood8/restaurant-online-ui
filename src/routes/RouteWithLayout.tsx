import React, { PropsWithChildren } from 'react';
import { Route, RouteProps } from 'react-router-dom';

interface IRouteWithLayoutProps extends RouteProps {
  layout: React.ComponentType<PropsWithChildren<any>> | React.ComponentType<any>;
}

export const RouteWithLayout: React.SFC<IRouteWithLayoutProps> = ({ layout: Layout, component: Component, ...rest }) => {
  if (!Component) {
    return null;
  }

  return (
    <Route {...rest} render={(props) => 
      <Layout>
        <Component {...props} />
      </Layout>
    } />
  );
};