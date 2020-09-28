import React from 'react';
import { RootLayout } from '../Root';
import { NavigationBarContainer } from '../../features/NavigationBarContainer';

export const CartLayout: React.FC = ({ children }) => {
  return (
    <RootLayout>
      <main className="container flex-grow-1">
        <NavigationBarContainer />
        {children}
      </main>
    </RootLayout>
  );
};
