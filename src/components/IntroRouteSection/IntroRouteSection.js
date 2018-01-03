// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import IntersectionObserver from '../IntersectionObserver';

import { INTRO_STEPS } from '../IntroRoute/IntroRoute.steps';

import type { IntroStep } from '../IntroRoute/IntroRoute.steps';

type Props = {
  id: IntroStep,
  currentStep: IntroStep,
  margin?: number,
  onIntersect: (id: IntroStep) => void,
  innerRef: (elem: HTMLElement) => void,
  children: React$Node,
};

class IntroRouteSection extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    if (nextProps.id === nextProps.currentStep) {
      return true;
    }

    const delta = Math.abs(
      INTRO_STEPS.indexOf(nextProps.id) -
        INTRO_STEPS.indexOf(nextProps.currentStep)
    );

    return delta <= 1;
  }

  render() {
    const {
      id,
      currentStep,
      onIntersect,
      margin = 0,
      innerRef,
      children,
    } = this.props;

    const isSelected = id === currentStep;

    return (
      <IntersectionObserver
        onlyFireOn="enter"
        id={id}
        onIntersect={onIntersect}
        rootMargin={`0px 0px -${window.innerHeight * 0.5}px 0px`}
      >
        <IntroRouteSectionElem
          innerRef={innerRef}
          margin={margin}
          isSelected={isSelected}
        >
          {children}
        </IntroRouteSectionElem>
      </IntersectionObserver>
    );
  }
}

const IntroRouteSectionElem = styled.div`
  margin-top: ${props => props.margin + 'px'};
  opacity: ${props => (props.isSelected ? 1 : 0.4)};
  transition: opacity 400ms;
`;

export default IntroRouteSection;
