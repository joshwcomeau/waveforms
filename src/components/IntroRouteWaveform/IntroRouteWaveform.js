// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Aux from '../Aux';
import AvailableWidth from '../AvailableWidth';
import Row from '../Row';
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
  frequencyOverride: ?number,
  amplitudeOverride: ?number,
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
  showFrequencySlider: boolean,
  showCycleIndicator: boolean,
};

class IntroRouteWaveform extends Component<Props, State> {
  state = {
    amplitude: 1,
    frequency: 1,
  };

  getDataForStep = (step: number): StepData => {
    const defaults: StepData = {
      frequencyOverride: null,
      amplitudeOverride: null,
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
      showFrequencySlider: false,
      showCycleIndicator: false,
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

      case 6: {
        return {
          ...defaults,
          showXAxisLabels: true,
          showCycleIndicator: true,
          frequencyOverride: 2,
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

  handleUpdateFrequency = val => {
    this.setState({ frequency: val });
  };

  renderContents = (width: number) => {
    const { currentStep } = this.props;
    const { amplitude, frequency } = this.state;

    const stepData = this.getDataForStep(currentStep);

    const { amplitudeOverride, frequencyOverride } = stepData;

    return (
      <Aux>
        <WaveformPlayer
          isPlaying={stepData.isPlaying}
          amplitude={
            typeof amplitudeOverride === 'number'
              ? amplitudeOverride
              : amplitude
          }
          numOfCycles={
            typeof frequencyOverride === 'number'
              ? frequencyOverride
              : frequency
          }
          speed={frequency * 0.75}
        >
          {({ amplitude, numOfCycles, progress, offset }) => (
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

        <Row gutter={15}>
          <FadeTransition
            typeName="div"
            isVisible={stepData.showAmplitudeSlider}
          >
            <Slider
              label="Amplitude"
              width={width / 2 - 15}
              min={0}
              max={1}
              step={0.01}
              defaultValue={1}
              value={amplitude}
              onChange={this.handleUpdateAmplitude}
            />
          </FadeTransition>

          <FadeTransition
            typeName="div"
            isVisible={stepData.showFrequencySlider}
          >
            <Slider
              label="Frequency"
              width={width / 2 - 15}
              min={1}
              max={6}
              defaultValue={1}
              value={frequency}
              onChange={this.handleUpdateFrequency}
            />
          </FadeTransition>
        </Row>
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
