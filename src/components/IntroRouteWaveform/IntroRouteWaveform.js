// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import { INTRO_STEPS, COLORS } from '../../constants';

import Aux from '../Aux';
import AvailableWidth from '../AvailableWidth';
import Row from '../Row';
import Spacer from '../Spacer';
import Waveform from '../Waveform';
import WaveformPlayer from '../WaveformPlayer';
import WaveformAxis from '../WaveformAxis';
import WaveformIntercept from '../WaveformIntercept';
import WaveformCycleIndicator from '../WaveformCycleIndicator';
import FadeTransition from '../FadeTransition';
import Slider from '../Slider';

import type { StepData } from '../IntroRoute/IntroRoute.helpers';

type Props = {
  amplitude: number,
  numOfCycles: number,
  progress: number,
  handleUpdateAmplitude: (amplitude: number) => void,
  handleUpdateFrequency: (frequency: number) => void,
  stepData: StepData,
};

class IntroRouteWaveform extends Component<Props> {
  renderContents = (width: number) => {
    const {
      amplitude,
      numOfCycles,
      progress,
      handleUpdateAmplitude,
      handleUpdateFrequency,
      stepData,
    } = this.props;

    // `progress` is an ever-increasing decimal value representing how many
    // iterations of the loop have occured.
    // Transform this value into a circular value between 0 and 99.
    const offset = (progress * 100) % 100;

    return (
      <Aux>
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

          <FadeTransition isVisible={stepData.showYAxisIntercept}>
            <WaveformIntercept
              size={20}
              color={COLORS.blue[500]}
              waveformSize={width}
              waveformShape={stepData.waveformShape}
              frequency={numOfCycles}
              amplitude={amplitude}
              offset={offset}
            />
          </FadeTransition>

          <FadeTransition
            typeName="div"
            isVisible={stepData.showCycleIndicator}
          >
            <WaveformCycleIndicator numOfCycles={numOfCycles} />
          </FadeTransition>
        </Aux>

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
              onChange={handleUpdateAmplitude}
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
              value={numOfCycles}
              onChange={handleUpdateFrequency}
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
