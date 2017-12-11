// @flow
import React, { PureComponent } from 'react';

import type { IntroStep } from '../../types';

import AvailableWidth from '../AvailableWidth';
import Waveform from '../Waveform';
import WaveformPlayer from '../WaveformPlayer';

type Props = {
  currentStep: IntroStep,
  progress: number,
};

class IntroRouteWaveform extends PureComponent<Props> {
  renderContents = (width: number) => {
    const { currentStep, progress } = this.props;

    // HACK: WaveformAxes wind up taking 20px more than advertised, because
    // they add 10px spacing on either side. I should refactor this so that
    // it subtracts from the waveform rather than add the spacing.
    const adjustedWidthForPlayer = width - 20;

    switch (currentStep) {
      case '1-introduction':
      default:
        return (
          <WaveformPlayer
            isPlaying
            shape="sine"
            size={adjustedWidthForPlayer}
          />
        );
    }
  };
  render() {
    return <AvailableWidth>{this.renderContents}</AvailableWidth>;
  }
}

export default IntroRouteWaveform;
