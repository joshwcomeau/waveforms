// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import { COLORS, INTRO_STEPS } from '../../constants';

import Aux from '../Aux';
import AvailableWidth from '../AvailableWidth';
import Waveform from '../Waveform';
import WaveformPlayer from '../WaveformPlayer';
import WaveformAxis from '../WaveformAxis';
import WaveformIntercept from '../WaveformIntercept';

import type { IntroStep } from '../../types';

type Props = {
  currentStep: number,
  progress: number,
};

class IntroRouteWaveform extends Component<Props> {
  renderContents = (width: number) => {
    const { currentStep, progress } = this.props;

    const isPlaying = [1].includes(currentStep);

    const showXAxis = true;

    return (
      <WaveformPlayer isPlaying={isPlaying} numOfCycles={2} speed={0.75}>
        {(offset, numOfCycles) => (
          <Aux>
            <Waveform
              color={COLORS.blue[500]}
              strokeWidth={5}
              size={width}
              shape="sine"
              offset={offset}
              numOfCycles={numOfCycles}
            />
            {showXAxis && (
              <WaveformAxis x strokeWidth={4} waveformSize={width} />
            )}
          </Aux>
        )}
      </WaveformPlayer>
    );
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
