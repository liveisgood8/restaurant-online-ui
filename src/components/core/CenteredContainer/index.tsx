import React, { useCallback } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import cn from 'classnames';

interface ICenteredContainerProps {
  className?: string;
  centerVertically?: boolean;
  mdColumns?: number;
  lgColumns?: number;
  xlColumns?: number;
}

interface IColumnSize {
  offset: number;
  span: number;
}

export const CenteredContainer: React.FC<React.PropsWithChildren<ICenteredContainerProps>> = ({
  className,
  centerVertically,
  mdColumns,
  lgColumns,
  xlColumns,
  children,
}) => {
  const calculateColumnSize = useCallback((columnSize: number): IColumnSize => {
    if (columnSize % 2 !== 0) {
      throw new Error('Column size must be even');
    }
    const offset = (12 - columnSize) / 2;
    return {
      offset,
      span: columnSize,
    };
  }, []);

  return (
    <Container fluid>
      <Row className={cn({ 'h-100': centerVertically })}>
        <Col
          sm={12}
          md={calculateColumnSize(mdColumns || 6)}
          lg={calculateColumnSize(lgColumns || 6)}
          xl={calculateColumnSize(xlColumns || 4)}
          className={cn({ 'd-flex align-items-center': centerVertically })}
        >
          <div className={cn({ 'w-100': centerVertically }, className)}>
            {children}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
