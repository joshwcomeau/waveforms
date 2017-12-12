// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import IntersectionObserver from '../IntersectionObserver';

import type { IntroStep } from '../../types';

type Props = {
  id: IntroStep,
  margin?: number,
  onIntersect: (id: IntroStep) => void,
  isSelected: boolean,
  children: React$Node,
};

const IntroRouteSection = ({
  id,
  onIntersect,
  margin = 0,
  isSelected,
  children,
}: Props) => {
  return (
    <IntersectionObserver id={id} onIntersect={onIntersect} onlyFireOn="exit">
      {/* prettier-ignore */}
      <IntroRouteSectionElem margin={margin} isSelected={isSelected}>
        {children}
      </IntroRouteSectionElem>
    </IntersectionObserver>
  );
};

const IntroRouteSectionElem = styled.div`
  font-size: 22px;
  font-weight: 200;
  line-height: 1.4;
  margin-top: ${props => props.margin + 'px'};
  color: ${props => (props.isSelected ? COLORS.gray[900] : COLORS.gray[500])};
  -webkit-font-smoothing: ${props =>
    props.isSelected ? 'subpixel-antialiased' : 'antialiased'};
`;

export default IntroRouteSection;
