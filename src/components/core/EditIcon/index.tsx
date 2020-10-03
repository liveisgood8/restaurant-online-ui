import { ReactComponent as PencilIcon } from './pencil.svg';

import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';

interface IEditIconProps {
  onClick?: () => void;
  showEditorComponent?: boolean;
  editorComponent: React.ReactElement<{
    onSubmit: () => void;
  }>;
}

export const EditIcon: React.FC<IEditIconProps> = ({ editorComponent, showEditorComponent }) => {
  const [showEditor, setShowEditor] = useState(false);
  const target = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setShowEditor(showEditorComponent || false);
  }, [showEditorComponent]);

  return (
    <Fragment>
      <div
        ref={target}
        className="d-inline-block mr-2 cursor-pointer"
        onClick={() => {
          setShowEditor(!showEditor);
        }}
      >
        <PencilIcon />
      </div>
      <Overlay target={target.current}
        show={showEditor}
        placement="right"
        rootClose={true}
        onHide={() => setShowEditor(false)}
      >
        <Tooltip id="editor" style={{ opacity: 0.95 }}>
          {editorComponent}
        </Tooltip>
      </Overlay>
    </Fragment>
  );
};
