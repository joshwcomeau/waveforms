// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { convertProgressToCycle } from '../../helpers/waveform.helpers';

import Aux from '../Aux';
import AvailableWidth from '../AvailableWidth';
import Row from '../Row';
import Spacer from '../Spacer';
import Waveform from '../Waveform';
import WaveformAxis from '../WaveformAxis';
import WaveformIntercept from '../WaveformIntercept';
import WaveformCycleIndicator from '../WaveformCycleIndicator';
import FadeTransition from '../FadeTransition';
import Slider from '../Slider';

import type { StepData } from '../IntroRoute/IntroRoute.steps';

type Props = {
  amplitude: number,
  frequency: number,
  progress: number,
  handleUpdateAmplitude: (amplitude: number) => void,
  handleUpdateFrequency: (frequency: number) => void,
  stepData: StepData,
};

class IntroRouteWaveform extends PureComponent<Props> {
  renderContents = (width: number) => {
    const {
      amplitude,
      frequency,
      progress,
      handleUpdateAmplitude,
      handleUpdateFrequency,
      stepData,
    } = this.props;

    // `progress` is an ever-increasing decimal value representing how many
    // iterations of the loop have occured.
    // Transform this value into a circular value between 0 and 99.
    const offset = convertProgressToCycle(progress);

    return (
      <Aux>
        <Waveform
          amplitude={amplitude}
          color={stepData.waveformColor}
          strokeWidth={5}
          opacity={stepData.waveformOpacity}
          size={width}
          shape={stepData.waveformShape}
          offset={offset}
          frequency={frequency}
        />

        <FadeTransition isVisible={stepData.showXAxis}>
          <WaveformAxis
            x
            strokeWidth={4}
            waveformSize={width}
            frequency={frequency}
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
            frequency={frequency}
            progress={progress}
            showLabels={stepData.showYAxisLabels}
            opacity={stepData.yAxisOpacity}
          />
        </FadeTransition>

        <FadeTransition isVisible={stepData.showYAxisIntercept}>
          <WaveformIntercept
            size={20}
            color={COLORS.primary[500]}
            waveformSize={width}
            waveformShape={stepData.waveformShape}
            frequency={frequency}
            amplitude={amplitude}
            offset={offset}
          />
        </FadeTransition>

        <FadeTransition typeName="div" isVisible={stepData.showCycleIndicator}>
          <WaveformCycleIndicator frequency={frequency} />
        </FadeTransition>

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
              min={stepData.frequencySliderMin}
              max={stepData.frequencySliderMax}
              step={stepData.frequencySliderStep}
              defaultValue={1}
              value={frequency}
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
