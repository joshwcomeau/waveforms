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

  NOTE: This implementation has a subtle bug: when you refresh the page BELOW
  this item, it never sets the correct `placeholderSize`. Because of that, when
  you scroll back up, content jumps, as the children expand and layout recalcs.

  The "fix" for this bug would be to start by mounting the component, calculate
  the height, and then unmount if necessary. This is a bad idea, though, since
  we don't want to cause a reflow right after the initial render!

  Because this bug only affects low-on-the-page refreshes, I think I can live
  with it.
*/
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { INTRO_STEPS } from '../IntroRoute/IntroRoute.steps';

import type { IntroStep } from '../IntroRoute/IntroRoute.steps';

type Props = {
  currentStep: IntroStep,
  belongsToStep: IntroStep,
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
    const { children } = this.props;
    const { shouldMount, placeholderSize } = this.state;

    return this.state.shouldMount ? (
      <div ref={elem => (this.wrapper = elem)}>{children}</div>
    ) : (
      <Placeholder size={placeholderSize} />
    );
  }
}

const Placeholder = styled.div`
  background: ${COLORS.gray[100]};
  height: ${props => props.size + 'px'};
`;

export default MountWhenVisible;
