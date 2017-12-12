// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Aux from '../Aux';
import AvailableWidth from '../AvailableWidth';
import Waveform from '../Waveform';
import WaveformPlayer from '../WaveformPlayer';
import WaveformAxis from '../WaveformAxis';
import WaveformIntercept from '../WaveformIntercept';

type Props = {
  currentStep: number,
  // TODO: Figure out if `progress` is actually needed.
  progress: number,
};

class IntroRouteWaveform extends Component<Props> {
  renderContents = (width: number) => {
    const { currentStep } = this.props;

    const isPlaying = [1].includes(currentStep);

    const showXAxis = true;
    const showXAxisLabels = [3].includes(currentStep);

    return (
      <WaveformPlayer isPlaying={isPlaying} numOfCycles={1} speed={0.75}>
        {({ progress, offset, numOfCycles }) => (
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
              <WaveformAxis
                x
                strokeWidth={4}
                waveformSize={width}
                numOfCycles={numOfCycles}
                progress={progress}
                showLabels={showXAxisLabels}
              />
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
