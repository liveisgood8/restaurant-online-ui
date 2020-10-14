import React from 'react';
import { RootLayout } from '../Root';
import { Container } from 'react-bootstrap';
import { AdminSidebarContainer } from '../../features/AdminSidebarContainer';

export const AdminLayout: React.FC = ({ children }) => {
  return (
    <RootLayout>
      <Container fluid className="d-flex flex-column flex-md-row p-0">
        <AdminSidebarContainer />
        <main className="container-fluid py-3">
          {children}
        </main>
      </Container>
    </RootLayout>
  );
};
