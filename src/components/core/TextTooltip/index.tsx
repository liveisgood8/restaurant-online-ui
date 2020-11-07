import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { OverlayInjectedProps, Placement } from 'react-bootstrap/esm/Overlay';

interface ITextTooltipProps {
  id?: string;
  placement: Placement;
  text: string;
  children: React.ReactElement;
}


export const TextTooltip: React.FC<ITextTooltipProps> = (props) => {
  const renderTooltip = (injectedProps: OverlayInjectedProps) => (
    <Tooltip id={props.id || 'tooltip'} {...injectedProps}>
      {props.text}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement={props.placement}
      overlay={renderTooltip}
    >
      {props.children}
    </OverlayTrigger>
  );
};
