// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

const PORTRAIT_PADDING = '16px';
const LANDSCAPE_PADDING = '25px';

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
  note: COLORS.primary[500],
  warning: COLORS.orange[500],
};

const titleColors = {
  note: COLORS.primary[500],
  warning: COLORS.orange[500],
};

const SidebarElem = styled.div`
  position: relative;
  background: ${props => backgroundColors[props.type]};
  margin-top: 75px;

  @media (orientation: portrait) {
    padding: ${PORTRAIT_PADDING};
    padding-top: calc(${PORTRAIT_PADDING} - 4px);
  }

  @media (orientation: landscape) {
    padding: ${LANDSCAPE_PADDING};
    padding-top: calc(${LANDSCAPE_PADDING} - 6px);
    margin-left: -${LANDSCAPE_PADDING};
    margin-right: -${LANDSCAPE_PADDING};
  }

  p,
  a {
    font-size: 20px;
    color: ${COLORS.white};
  }

  p:last-of-type {
    margin-bottom: 0;
  }
`;

const Title = styled.div`
  position: absolute;
  top: 0;

  color: ${props => titleColors[props.type]};
  font-size: 21px;
  font-weight: 500;
  text-transform: uppercase;
  transform: translateY(-125%);

  @media (orientation: portrait) {
    left: ${PORTRAIT_PADDING};
  }

  @media (orientation: landscape) {
    left: ${LANDSCAPE_PADDING};
  }
`;

export default Sidebar;
