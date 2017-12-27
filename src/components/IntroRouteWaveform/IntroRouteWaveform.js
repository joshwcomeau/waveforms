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
      <FlexParent>
        <WaveformWrapper>
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
              showLabels={stepData.showXAxisLabels}
              opacity={stepData.xAxisOpacity}
            />
          </FadeTransition>
          <FadeTransition isVisible={stepData.showYAxis}>
            <WaveformAxis
              y
              strokeWidth={4}
              waveformSize={width}
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

          <FadeTransition
            typeName="div"
            isVisible={stepData.showCycleIndicator}
          >
            <WaveformCycleIndicator frequency={frequency} />
          </FadeTransition>
        </WaveformWrapper>

        <ControlsWrapper>
          <Row gutter={15}>
            <FadeTransition
              mountOnEnter
              unmountOnExit
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
              mountOnEnter
              unmountOnExit
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
        </ControlsWrapper>
      </FlexParent>
    );
  };

  render() {
    return (
      <Aux>
        {/*
          InitialSpacer is used on desktop to align the waveform with the
          title. position: sticky takes over but we need this to offset it
          initially
        */}
        <InitialSpacer />

        <IntroRouteWaveformWrapper>
          <AvailableWidth>{this.renderContents}</AvailableWidth>
        </IntroRouteWaveformWrapper>
      </Aux>
    );
  }
}

const FlexParent = styled.div`
  display: flex;
  flex-direction: column;

  @media (orientation: portrait) {
    flex-direction: column-reverse;
  }
`;

const WaveformWrapper = styled.div`
  @media (orientation: landscape) {
    padding-bottom: 40px;
  }
`;

const ControlsWrapper = styled.div`
  @media (orientation: portrait) {
    padding-bottom: 40px;
  }
`;

const InitialSpacer = styled.div`
  @media (orientation: landscape) {
    height: 175px;
  }
`;

const IntroRouteWaveformWrapper = styled.div`
  @media (orientation: landscape) {
    position: sticky;
    top: 50px;
  }

  @media (orientation: portrait) {
    position: fixed;
    z-index: 5;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.25rem 3rem 2rem;
    background: ${COLORS.gray[50]};
  }
`;

export default IntroRouteWaveform;
