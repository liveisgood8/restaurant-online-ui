import { ReactComponent as SettingsIcon } from './settings.svg';

import React from 'react';
import { RoutePath } from '../../../routes/paths';
import { Link } from 'react-router-dom';
import { Bubble } from '../Bubble';

interface IAdminPanelBubbleProps {
  className?: string;
}

export const AdminPanelBubble: React.FC<IAdminPanelBubbleProps> = ({ className }) => {
  return (
    <Link to={RoutePath.ADMIN_DISH_MENU} className="text-decoration-none text-dark">
      <Bubble className={className}>
        <span>
          <SettingsIcon width="1.5rem" height="1.5rem" />
        </span>
      </Bubble>
    </Link>
  );
};
