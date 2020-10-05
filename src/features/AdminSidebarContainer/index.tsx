import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { AdminSidebarElement, AdminSidebar } from '../../components/AdminSidebar';
import { RoutePath } from '../../routes/paths';

export const AdminSidebarContainer: React.SFC = () => {
  const currentLocationPath = useSelector((state: RootState) => state.router.location.pathname);

  const currentLocationToSidebarElement = (): AdminSidebarElement | undefined => {
    switch (currentLocationPath) {
      case RoutePath.ADMIN_DISH_MENU:
        return AdminSidebarElement.DISH_MENU_EDITOR;
      case RoutePath.ADMIN_ORDERS:
        return AdminSidebarElement.ORDER_CONTROL;
    }
  };

  return (
    <AdminSidebar
      selectedElement={currentLocationToSidebarElement()}
    />
  );
};
