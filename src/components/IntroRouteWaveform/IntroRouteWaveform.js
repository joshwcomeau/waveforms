// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import { COLORS, INTRO_STEPS } from '../../constants';

import Aux from '../Aux';
import AvailableWidth from '../AvailableWidth';
import Waveform from '../Waveform';
import WaveformPlayer from '../WaveformPlayer';
import WaveformAxes from '../WaveformAxes';
import WaveformIntercept from '../WaveformIntercept';

import type { IntroStep } from '../../types';

type Props = {
  currentStep: number,
  progress: number,
};

class IntroRouteWaveform extends Component<Props> {
  renderContents = (width: number) => {
    const { currentStep, progress } = this.props;

    switch (currentStep) {
      case 0:
      case 1: {
        const isPlaying = currentStep === 1;

        return (
          <WaveformPlayer isPlaying={isPlaying} frequency={0.4}>
            {offset => (
              <Aux>
                <Waveform
                  color={COLORS.blue[500]}
                  strokeWidth={5}
                  size={width}
                  shape="sine"
                  offset={offset}
                  frequency={2}
                />
                <WaveformAxes size={width} showYAxis={false} />
              </Aux>
            )}
          </WaveformPlayer>
        );
      }
    }
  };
  render() {
    return (
      <Aux>
        <InitialSpacer />
        <IntroRouteWaveformWrapper>
          <AvailableWidth>{this.renderContents}</AvailableWidth>
        </IntroRouteWaveformWrapper>
      </Aux>
    );
  }
}

const InitialSpacer = styled.div`
  height: 175px;
`;
const IntroRouteWaveformWrapper = styled.div`
  position: sticky;
  top: 50px;
`;

export default IntroRouteWaveform;
