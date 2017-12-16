// @flow
import React, { Children } from 'react';
import styled from 'styled-components';

type Props = {
  gutter?: number,
};

const Row = ({ gutter = 0, children } = Props) => (
  <RowElem>
    {Children.toArray(children).map((child, index) => (
      <FlexChild key={index}>{child}</FlexChild>
    ))}
  </RowElem>
);

const RowElem = styled.div`
  display: flex;
  flex-direction: row;
`;

const FlexChild = styled.div`
  flex: 1;

  &:first-of-type {
    margin-right: ${props => props.gutter + 'px'};
  }
  &:last-of-type {
    margin-left: ${props => props.gutter + 'px'};
  }
`;

export default Row;
