// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import type { IntroStep } from '../../types';

import Aux from '../Aux';
import AvailableWidth from '../AvailableWidth';
import Waveform from '../Waveform';
import WaveformPlayer from '../WaveformPlayer';
import WaveformAxes from '../WaveformAxes';
import WaveformIntercept from '../WaveformIntercept';

type Props = {
  currentStep: IntroStep,
  progress: number,
};

class IntroRouteWaveform extends PureComponent<Props> {
  renderContents = (width: number) => {
    const { currentStep, progress } = this.props;

    switch (currentStep) {
      case '1-introduction':
      default:
        return (
          <WaveformPlayer isPlaying>
            {offset => (
              <Aux>
                <WaveformAxes size={width} />
                <Waveform size={width} shape="sine" offset={offset} />
                <WaveformIntercept size={width} shape="sine" offset={offset} />
              </Aux>
            )}
          </WaveformPlayer>
        );
    }
  };
  render() {
    return (
      <IntroRouteWaveformWrapper>
        <AvailableWidth>{this.renderContents}</AvailableWidth>
      </IntroRouteWaveformWrapper>
    );
  }
}

const IntroRouteWaveformWrapper = styled.div``;

export default IntroRouteWaveform;
