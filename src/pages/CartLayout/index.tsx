import React from 'react';
import { RootLayout } from '../Root';
import { NavigationBarContainer } from '../../features/NavigationBarContainer';

export const CartLayout: React.SFC = ({ children }) => {
  return (
    <RootLayout>
      <NavigationBarContainer />
      <main>
        {children}
      </main>
    </RootLayout>
  );
};