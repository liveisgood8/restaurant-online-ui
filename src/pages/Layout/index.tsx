import React from 'react';
import { NavigationBarContainer } from '../../features/NavigationBarContainer';

export const Layout: React.SFC = ({ children }) => {
  return (
    <React.Fragment>
      <NavigationBarContainer />
      <main>
        {children}
      </main>
    </React.Fragment>
  );
};