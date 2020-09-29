import React, { useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import cn from 'classnames';

interface ICenteredContainerProps {
  className?: string;
  centerVertically?: boolean;
  mdColumns?: number;
  lgColumns?: number;
}

interface IColumnSize {
  offset: number;
  span: number;
}

export const CenteredContainer: React.SFC<React.PropsWithChildren<ICenteredContainerProps>> = ({
  className,
  centerVertically,
  mdColumns,
  lgColumns,
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
    <Container className={cn({ 'd-flex h-100': centerVertically })}>
      <Row className={cn({ 'flex-grow-1': centerVertically })}>
        <Col
          sm={12}
          md={calculateColumnSize(mdColumns || 8)}
          lg={calculateColumnSize(lgColumns || 8)}
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
