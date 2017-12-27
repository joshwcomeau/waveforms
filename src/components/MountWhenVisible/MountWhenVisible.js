// @flow
/*
  The waveform lessons can be quite long, and often it doesn't make sense to
  render intensive-cost components (like the AirGrid or FrequencyGraph) when
  they aren't visible.

  This component unmounts components that can't possibly be visible. Rather
  than using IntersectionObserver again, I can simply use the `currentStep`
  stuff (which itself uses IntersectionObserver). The user can only view 1-2
  steps at a time, and so if this component is far enough from it, we can rest
  assured that it isn't visible.

  If known, an estimated size can be provided. This is only used in the rare
  case where a component is first mounted while scrolling UP to it (eg. the
  user refreshes the page near the bottom and then scrolls back up). Without
  `estimatedSize`, the container will start at 0px tall, and then the layout
  will jump when the user scrolls.

*/
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { INTRO_STEPS } from '../IntroRoute/IntroRoute.steps';

import type { IntroStep } from '../IntroRoute/IntroRoute.steps';

type Props = {
  // The currently-visible step
  currentStep: IntroStep,
  // The step which "owns" this component and its children. Will mount based
  // on this value in comparison to `currentStep`.
  belongsToStep: IntroStep,
  // `estimatedSize` is only used in rare cases, to prevent layout reflow.
  // see docstring at top of file.
  estimatedSize?: number,

  children: React$Node,
};

type State = {
  shouldMount: boolean,
  placeholderSize?: ?number,
};

class MountWhenVisible extends PureComponent<Props, State> {
  state = {
    shouldMount: false,
    placeholderSize: null,
  };

  wrapper: ?HTMLElement;

  componentDidUpdate(prevProps: Props, prevState: State) {
    // Whenever the `currentStep` changes, we need to evaluate if we should
    // change the visibility status.
    if (prevProps.currentStep !== this.props.currentStep) {
      this.handleChangeStep(prevState);
    }
  }

  handleChangeStep = (prevState: State) => {
    const { currentStep, belongsToStep } = this.props;

    const currentStepIndex = INTRO_STEPS.indexOf(currentStep);
    const belongsToStepIndex = INTRO_STEPS.indexOf(belongsToStep);

    const delta = belongsToStepIndex - currentStepIndex;

    const nextState: State = {
      shouldMount: delta === 0 || delta === 1,
    };

    // If this update is causing the item to be hidden, we should capture the
    // height of the wrapper, so that we can apply it to our placeholder.
    if (prevState.shouldMount && !nextState.shouldMount && this.wrapper) {
      nextState.placeholderSize = this.wrapper.getBoundingClientRect().height;
    }

    this.setState(nextState);
  };

  render() {
    const { estimatedSize, children } = this.props;
    const { shouldMount, placeholderSize } = this.state;

    // prettier-ignore
    return shouldMount
      ? <div ref={elem => (this.wrapper = elem)}>{children}</div>
      : <Placeholder size={placeholderSize || estimatedSize} />;
  }
}

const Placeholder = styled.div`
  background: ${COLORS.gray[100]};
  height: ${({ size }) => (typeof size === 'number' ? size + 'px' : 'auto')};
`;

export default MountWhenVisible;
