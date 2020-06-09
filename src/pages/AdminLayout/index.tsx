import React from 'react';
import { RootLayout } from '../Root';
import { Container } from 'react-bootstrap';
import { AdminSidebarContainer } from '../../features/AdminSidebarContainer';

export const AdminLayout: React.SFC = ({ children }) => {
  return (
    <RootLayout>
      <Container fluid className="d-flex p-0">
        <AdminSidebarContainer />
        <main className="container-fluid py-3">
          {children}
        </main>
      </Container>
    </RootLayout>
  )
};