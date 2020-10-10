import { ReactComponent as PencilIcon } from './pencil.svg';

import React from 'react';

export const EditIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <PencilIcon {...props} />
  );
};
