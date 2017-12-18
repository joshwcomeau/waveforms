// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

const PADDING = 25;

type Props = {
  type?: 'notice' | 'warning',
  children: React$Node,
};

const Sidebar = ({ type = 'note', children }: Props) => (
  <SidebarElem type={type}>
    <Title type={type}>{type}</Title>
    {children}
  </SidebarElem>
);

const backgroundColors = {
  note: COLORS.blue[100],
  warning: COLORS.orange[100],
};

const titleColors = {
  note: COLORS.blue[500],
  warning: COLORS.orange[500],
};

const SidebarElem = styled.div`
  position: relative;
  background: ${props => backgroundColors[props.type]};
  padding: ${PADDING + 'px'};
  margin-left: ${-PADDING + 'px'};
  margin-right: ${-PADDING + 'px'};
  margin-top: 75px;

  p {
    font-size: 20px;
  }

  p:last-of-type {
    margin-bottom: 0;
  }
`;

const Title = styled.div`
  position: absolute;
  top: 0;
  left: ${PADDING};
  color: ${props => titleColors[props.type]};
  font-size: 21px;
  font-weight: 500;
  text-transform: uppercase;
  transform: translateY(-125%);
`;

export default Sidebar;
