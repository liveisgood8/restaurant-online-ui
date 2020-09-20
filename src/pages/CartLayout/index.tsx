import React from 'react';
import { RootLayout } from '../Root';
import { NavigationBarContainer } from '../../features/NavigationBarContainer';

export const CartLayout: React.FC = ({ children }) => {
  return (
    <RootLayout>
      <NavigationBarContainer />
      <main className="container-fluid flex-grow-1 py-3">
        {children}
      </main>
    </RootLayout>
  );
};
