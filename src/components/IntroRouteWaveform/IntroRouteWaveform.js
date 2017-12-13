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
import FadeTransition from '../FadeTransition';

type Props = {
  currentStep: number,
  // TODO: Figure out if `progress` is actually needed.
  progress: number,
};

type StepData = {
  isPlaying: boolean,
  waveformColor: string,
  waveformOpacity: number,
  // TODO: should just use `xAxisOpacity`. When opacity is 0, we can choose
  // not to render within the component (or just keep it hidden)
  showXAxis: boolean,
  showYAxis: boolean,
  showXAxisLabels: boolean,
  showYAxisLabels: boolean,
  xAxisOpacity: number,
  yAxisOpacity: number,
};

class IntroRouteWaveform extends Component<Props> {
  getDataForStep = (step: number): StepData => {
    const defaults = {
      isPlaying: false,
      waveformColor: COLORS.blue[500],
      waveformOpacity: 1,
      showXAxis: true,
      showYAxis: true,
      showXAxisLabels: false,
      showYAxisLabels: false,
      xAxisOpacity: 1,
      yAxisOpacity: 1,
    };
    switch (step) {
      case 0: {
        return {
          ...defaults,
          showYAxis: false,
        };
      }

      case 1: {
        return {
          ...defaults,
          isPlaying: true,
          showYAxis: false,
        };
      }

      case 2: {
        return defaults;
      }

      case 3: {
        return {
          ...defaults,
          waveformOpacity: 0.5,
          showXAxisLabels: true,
          yAxisOpacity: 0.2,
        };
      }

      case 4: {
        return {
          ...defaults,
          waveformOpacity: 0.5,
          showYAxisLabels: true,
          xAxisOpacity: 0.2,
        };
      }

      default:
        console.error(
          'Unrecognized step number!! Returning default values for waveform'
        );
        return defaults;
    }
  };

  renderContents = (width: number) => {
    const stepData = this.getDataForStep(this.props.currentStep);

    return (
      <WaveformPlayer
        isPlaying={stepData.isPlaying}
        numOfCycles={1}
        speed={0.75}
      >
        {({ progress, offset, numOfCycles }) => (
          <Aux>
            <Waveform
              color={stepData.waveformColor}
              strokeWidth={5}
              opacity={stepData.waveformOpacity}
              size={width}
              shape="sine"
              offset={offset}
              numOfCycles={numOfCycles}
            />
            <FadeTransition isVisible={stepData.showXAxis}>
              <WaveformAxis
                x
                strokeWidth={4}
                waveformSize={width}
                numOfCycles={numOfCycles}
                progress={progress}
                showLabels={stepData.showXAxisLabels}
                opacity={stepData.xAxisOpacity}
              />
            </FadeTransition>
            <FadeTransition isVisible={stepData.showYAxis}>
              <WaveformAxis
                y
                strokeWidth={4}
                waveformSize={width}
                numOfCycles={numOfCycles}
                progress={progress}
                opacity={stepData.yAxisOpacity}
              />
            </FadeTransition>
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
