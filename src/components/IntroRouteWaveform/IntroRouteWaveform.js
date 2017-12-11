// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Aux from '../Aux';
import AvailableWidth from '../AvailableWidth';
import Waveform from '../Waveform';
import WaveformPlayer from '../WaveformPlayer';
import WaveformAxes from '../WaveformAxes';
import WaveformIntercept from '../WaveformIntercept';

import type { IntroStep } from '../../types';

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
          <WaveformPlayer isPlaying frequency={0.4}>
            {offset => (
              <Aux>
                <WaveformAxes size={width} showYAxis={false} />
                <Waveform
                  color={COLORS.blue[500]}
                  strokeWidth={5}
                  size={width}
                  shape="sine"
                  offset={offset}
                  frequency={2}
                />
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
