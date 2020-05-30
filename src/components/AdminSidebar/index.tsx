import './styles.scss';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faCube, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../routes/paths';

export enum AdminSidebarElement {
  DISH_MENU_EDITOR,
  ORDER_CONTROL,
}

interface IAdminSidebarProps {
  selectedElement?: AdminSidebarElement;
}

export const AdminSidebar: React.SFC<IAdminSidebarProps> = ({ selectedElement }) => {
  const isElementSelected = (element: AdminSidebarElement): boolean => {
    return selectedElement === element;
  };

  return (
    <nav id="admin-sidebar">
      <ul className="list-unstyled w-100">
        <SideBarElement
          icon={faUtensils}
          link={RoutePath.ADMIN_DISH_MENU}
          isSelected={isElementSelected(AdminSidebarElement.DISH_MENU_EDITOR)} 
        />
        <SideBarElement
          icon={faCube}
          link={RoutePath.ADMIN_ORDERS}
          isSelected={isElementSelected(AdminSidebarElement.ORDER_CONTROL)} 
        />
      </ul>
    </nav>
  );
};

interface ISideBarElementProps {
  icon: IconDefinition;
  link: string;
  isSelected?: boolean;
}

const SideBarElement: React.SFC<ISideBarElementProps> = ({ icon, isSelected, link }) => {
  return (
    <li className={classNames('text-center', {'selected-menu-element': isSelected})}>
      <Link className="deco-none" to={link}>
        <FontAwesomeIcon icon={icon} className="icon" />
      </Link>
    </li>
  );
};