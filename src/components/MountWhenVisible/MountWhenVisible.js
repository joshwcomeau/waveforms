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
*/
import React, { PureComponent } from 'react';

import { INTRO_STEPS } from '../IntroRoute/IntroRoute.steps';

import type { IntroStep } from '../IntroRoute/IntroRoute.steps';

type Props = {
  currentStep: IntroStep,
  belongsToStep: IntroStep,
  children: React$Node,
};

type State = {
  shouldMount: boolean,
  placeholderHeight: ?number,
};

class MountWhenVisible extends PureComponent<Props, State> {
  state = {
    shouldMount: false,
    placeholderHeight: null,
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    // Whenever the `currentStep` changes, we need to evaluate if we should
    // change the visibility status.
    if (prevProps.currentStep !== this.props.currentStep) {
      this.handleChangeStep();
    }
  }

  handleChangeStep = () => {
    const { currentStep, belongsToStep } = this.props;
    const currentStepIndex = INTRO_STEPS.indexOf(currentStep);
    const belongsToStepIndex = INTRO_STEPS.indexOf(belongsToStep);

    const delta = belongsToStepIndex - currentStepIndex;

    const shouldMount = delta === 0 || delta === 1;

    this.setState({ shouldMount });
  };

  render() {
    return this.state.shouldMount ? this.props.children : null;
  }
}

export default MountWhenVisible;
