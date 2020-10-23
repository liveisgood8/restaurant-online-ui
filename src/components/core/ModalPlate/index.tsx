import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from '../Button';
import { Icons } from '../icons/icons';

interface IModalPlateProps {
  className?: string;
  title?: string;
  show?: boolean;
  onHide?: () => void;
}

export const ModalPlate: React.FC<IModalPlateProps> = (props) => {
  return (
    <Modal
      show={props.show}
      centered
      onHide={props.onHide}
      dialogClassName={props.className}
    >
      <div className="d-flex my-2 mx-2 align-items-center">
        <span className="ro-font-medium-base">{props.title}</span>
        <Button
          disableShadow
          variant="danger"
          className="ml-auto"
          rightIcon={Icons.CROSS}
          onClick={props.onHide}
        />
      </div>
      {props.children}
    </Modal>
  );
};
