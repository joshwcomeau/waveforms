// @flow
import React from 'react';
import styled from 'styled-components';

import IntersectionObserver from '../IntersectionObserver';

import type { IntroStep } from '../../types';

type Props = {
  id: IntroStep,
  onIntersect: (id: IntroStep) => void,
  margin?: number,
  children: React$Node,
};

const IntroRouteSection = ({
  id,
  onIntersect,
  margin = 0,
  children,
}: Props) => {
  return (
    <IntersectionObserver id={id} onIntersect={onIntersect}>
      {/* prettier-ignore */}
      <IntroRouteSectionElem margin={margin}>
        {children}
      </IntroRouteSectionElem>
    </IntersectionObserver>
  );
};

const IntroRouteSectionElem = styled.div`
  height: 1000px;
  font-size: 22px;
  line-height: 1.4;
  margin-top: ${props => props.margin + 'px'};
`;

export default IntroRouteSection;
