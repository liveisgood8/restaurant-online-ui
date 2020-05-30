import React from 'react';
import { NavigationBarContainer } from '../../features/NavigationBarContainer';
import { ToastContainer } from 'react-toastify';

export const Layout: React.SFC = ({ children }) => {
  return (
    <React.Fragment>
      <NavigationBarContainer />
      <main>
        {children}
      </main>
      <ToastContainer />
    </React.Fragment>
  );
};