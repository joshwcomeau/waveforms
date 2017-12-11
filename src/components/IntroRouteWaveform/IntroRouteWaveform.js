// @flow
import React, { PureComponent } from 'react';

import type { IntroStep } from '../../types';

import AvailableWidth from '../AvailableWidth';
import Waveform from '../Waveform';

type Props = {
  currentStep: IntroStep,
  progress: number,
};

class IntroRouteWaveform extends PureComponent<Props> {
  render() {
    return (
      <AvailableWidth>
        {width => <Waveform shape="sine" size={width} />}
      </AvailableWidth>
    );
  }
}

export default IntroRouteWaveform;
