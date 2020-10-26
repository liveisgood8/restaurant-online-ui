import { ReactComponent as LogoIcon } from './svgs/logo.svg';
import { ReactComponent as VkIcon } from './svgs/vk.svg';
import { ReactComponent as GoogleIcon } from './svgs/google.svg';
import { ReactComponent as FacebookIcon } from './svgs/facebook.svg';
import { ReactComponent as MinusIcon } from './svgs/minus.svg';
import { ReactComponent as PlusIcon } from './svgs/plus.svg';
import { ReactComponent as ClockIcon } from './svgs/clock.svg';
import { ReactComponent as BurgerIcon } from './svgs/burger.svg';

import { faAngleDoubleLeft, faAngleDoubleRight, faCheck, faMapMarkerAlt, faPencilAlt, faPhoneAlt, faReceipt, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { CSSProperties, Fragment } from 'react';
import { Icons } from './icons';

interface IIconProps {
  icon: Icons;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const toFontAwesomeIcon = (icon: Icons) => {
  switch (icon) {
    case Icons.PENCIL:
      return faPencilAlt;
    case Icons.TRASH:
      return faTrash;
    case Icons.CROSS:
      return faTimes;
    case Icons.PHONE:
      return faPhoneAlt;
    case Icons.GEO:
      return faMapMarkerAlt;
    case Icons.RECEIPT:
      return faReceipt;
    case Icons.CHECK:
      return faCheck;
    case Icons.DOUBLE_RIGHT_ARROW:
      return faAngleDoubleRight;
    case Icons.DOUBLE_LEFT_ARROW:
      return faAngleDoubleLeft;
    default:
      throw new Error('Unknown icon: ' + icon.toString());
  }
};

const getNativeIconComponent = (icon: Icons) => {
  switch (icon) {
    case Icons.LOGO:
      return LogoIcon;
    case Icons.VK:
      return VkIcon;
    case Icons.GOOGLE:
      return GoogleIcon;
    case Icons.FACEBOOK:
      return FacebookIcon;
    case Icons.MINUS:
      return MinusIcon;
    case Icons.PLUS:
      return PlusIcon;
    case Icons.CLOCK:
      return ClockIcon;
    case Icons.BURGER:
      return BurgerIcon;
  }
};

export const Icon: React.FC<IIconProps> = (props) => {
  const NativeIcon = getNativeIconComponent(props.icon);

  return (
    <Fragment>
      {NativeIcon ? (
        <NativeIcon
          {...props}
          fill="currentColor"
        />
      ) : (
        <FontAwesomeIcon
          {...props}
          icon={toFontAwesomeIcon(props.icon)}
        />
      )}
    </Fragment>
  );
};
