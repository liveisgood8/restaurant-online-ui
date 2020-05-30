import React from 'react';
import { ToastContainer } from 'react-toastify';

export const RootLayout: React.SFC = ({ children }) => {
  return (
    <React.Fragment>
      {children}
      <ToastContainer />
    </React.Fragment>
  );
};