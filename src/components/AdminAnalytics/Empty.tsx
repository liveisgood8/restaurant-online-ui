import React from 'react';
import { Icon } from '../core/icons/Icon';
import { Icons } from '../core/icons/icons';

export const Empty: React.FC = (props) => {
  return (
    <div className="d-flex flex-column align-items-center analytics__empty">
      <Icon className="analytics-empty__icon" icon={Icons.BROKE} />
      <p className="mt-2">Нет данных</p>
    </div>
  );
};
