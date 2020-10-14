import './styles.scss';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faCube, IconDefinition, faBars, faHome } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../routes/paths';
import { Collapse } from 'react-bootstrap';

export enum AdminSidebarElement {
  DISH_MENU_EDITOR,
  ORDER_CONTROL,
}

interface IAdminSidebarProps {
  selectedElement?: AdminSidebarElement;
}

export const AdminSidebar: React.FC<IAdminSidebarProps> = ({ selectedElement }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const isElementSelected = (element: AdminSidebarElement): boolean => {
    return selectedElement === element;
  };

  return (
    <nav id="admin-sidebar">
      <div className="p-3 d-flex d-md-none justify-content-center align-items-center">
        <span className="flex-grow-1 text-center ro-font-medium-base">
          <Link to={RoutePath.HOME} className="text-decoration-none text-white">
              Ресторан-онлайн
          </Link>
        </span>
        <span
          className="d-md-none"
          onClick={(): void => setShowSidebar(!showSidebar)}
        >
          <FontAwesomeIcon color="white" icon={faBars}/>
        </span>
      </div>

      <Collapse in={showSidebar}>
        <ul className="list-unstyled w-100">
          <SideBarElement
            className="d-none d-md-block mb-3"
            icon={faHome}
            link={RoutePath.HOME}
            text="На главную"
            isSelected={false}
          />
          <SideBarElement
            icon={faUtensils}
            link={RoutePath.ADMIN_DISH_MENU}
            text="Управление меню"
            isSelected={isElementSelected(AdminSidebarElement.DISH_MENU_EDITOR)}
          />
          <SideBarElement
            icon={faCube}
            link={RoutePath.ADMIN_ORDERS}
            text="Оформление заказов"
            isSelected={isElementSelected(AdminSidebarElement.ORDER_CONTROL)}
          />
        </ul>
      </Collapse>
    </nav>
  );
};

interface ISideBarElementProps {
  className?: string;
  icon: IconDefinition;
  link: string;
  text: string;
  isSelected?: boolean;
}

const SideBarElement: React.FC<ISideBarElementProps> = ({ className, icon, isSelected, link, text }) => {
  return (
    <li className={classNames( className, 'text-center', { 'selected-menu-element': isSelected })}>
      <Link className="text-decoration-none d-flex align-items-center justify-content-center" to={link}>
        <FontAwesomeIcon icon={icon} className="icon" />
        <span className="ml-3 d-md-none text-white">{text}</span>
      </Link>
    </li>
  );
};
