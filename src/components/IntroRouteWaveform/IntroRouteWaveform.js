// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Aux from '../Aux';
import AvailableWidth from '../AvailableWidth';
import Spacer from '../Spacer';
import Waveform from '../Waveform';
import WaveformPlayer from '../WaveformPlayer';
import WaveformAxis from '../WaveformAxis';
import WaveformIntercept from '../WaveformIntercept';
import FadeTransition from '../FadeTransition';
import Slider from '../Slider';

type Props = {
  currentStep: number,
  // TODO: Figure out if `progress` is actually needed.
  progress: number,
};

type State = {
  frequency: 1,
  amplitude: 1,
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
  showAmplitudeSlider: boolean,
};

class IntroRouteWaveform extends Component<Props, State> {
  state = {
    amplitude: 1,
  };

  getDataForStep = (step: number): StepData => {
    const defaults: StepData = {
      isPlaying: false,
      waveformColor: COLORS.blue[500],
      waveformOpacity: 1,
      showXAxis: true,
      showYAxis: true,
      showXAxisLabels: false,
      showYAxisLabels: false,
      xAxisOpacity: 1,
      yAxisOpacity: 1,
      showAmplitudeSlider: false,
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
        };
      }

      case 4: {
        return {
          ...defaults,
          waveformOpacity: 0.5,
          showYAxisLabels: true,
        };
      }

      case 5: {
        return {
          ...defaults,
          showYAxisLabels: true,
          showAmplitudeSlider: true,
        };
      }

      default:
        console.error(
          'Unrecognized step number!! Returning default values for waveform'
        );
        return defaults;
    }
  };

  handleUpdateAmplitude = val => {
    this.setState({ amplitude: val });
  };

  renderContents = (width: number) => {
    const { currentStep } = this.props;
    const { amplitude } = this.state;

    const stepData = this.getDataForStep(currentStep);

    return (
      <Aux>
        <WaveformPlayer
          isPlaying={stepData.isPlaying}
          numOfCycles={1}
          speed={0.75}
        >
          {({ progress, offset, numOfCycles }) => (
            <Aux>
              <Waveform
                amplitude={amplitude}
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
                  showLabels={stepData.showYAxisLabels}
                  opacity={stepData.yAxisOpacity}
                />
              </FadeTransition>
            </Aux>
          )}
        </WaveformPlayer>

        <Spacer size={40} />

        <FadeTransition typeName="div" isVisible={stepData.showAmplitudeSlider}>
          <Slider
            min={0}
            max={1.2}
            step={0.01}
            defaultValue={1}
            value={amplitude}
            onChange={this.handleUpdateAmplitude}
          />
        </FadeTransition>
      </Aux>
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
