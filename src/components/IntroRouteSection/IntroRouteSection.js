// @flow
import React from 'react';
import styled from 'styled-components';

import IntersectionObserver from '../IntersectionObserver';

import type { IntroStep } from '../../types';

type Props = {
  id: IntroStep,
  margin?: number,
  onIntersect: (id: IntroStep) => void,
  isSelected: boolean,
  innerRef: (elem: HTMLElement) => void,
  children: React$Node,
};

const IntroRouteSection = ({
  id,
  onIntersect,
  margin = 0,
  isSelected,
  innerRef,
  children,
}: Props) => {
  return (
    <IntersectionObserver id={id} onIntersect={onIntersect} onlyFireOn="exit">
      <IntroRouteSectionElem
        innerRef={innerRef}
        margin={margin}
        isSelected={isSelected}
      >
        {children}
      </IntroRouteSectionElem>
    </IntersectionObserver>
  );
};

const IntroRouteSectionElem = styled.div`
  margin-top: ${props => props.margin + 'px'};
  opacity: ${props => (props.isSelected ? 1 : 0.4)};
  transition: opacity 400ms;
`;

export default IntroRouteSection;
