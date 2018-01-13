// @flow
import React from 'react';
import styled, { keyframes } from 'styled-components';

import Slider from '../Slider';

import type { StepData } from '../IntroRoute/IntroRoute.steps';

type Props = {
  width: number,

  amplitude: number,
  frequency: number,
  phase: number,
  numOfHarmonics: number,
  convergence: number,

  handleUpdateAmplitude: (amplitude: number) => void,
  handleUpdateFrequency: (frequency: number) => void,
  handleUpdateNumOfHarmonics: (val: number) => void,
  handleUpdateConvergence: (val: number) => void,
  handleUpdatePhase: (val: number) => void,

  stepData: StepData,
};

const WaveformControls = ({
  width,
  amplitude,
  frequency,
  convergence,
  numOfHarmonics,
  phase,
  handleUpdateAmplitude,
  handleUpdateFrequency,
  handleUpdateConvergence,
  handleUpdateNumOfHarmonics,
  handleUpdatePhase,
  stepData,
}: Props) => {
  const sliderWidth = width / 2 - 8;

  return (
    <ControlsWrapper>
      {stepData.showAmplitudeSlider && (
        <Control width={sliderWidth}>
          <Slider
            label="Amplitude"
            width={sliderWidth}
            min={0}
            max={1}
            step={0.01}
            defaultValue={1}
            value={amplitude}
            onChange={handleUpdateAmplitude}
          />
        </Control>
      )}

      {stepData.showFrequencySlider && (
        <Control width={sliderWidth}>
          <Slider
            label="Frequency"
            width={sliderWidth}
            min={stepData.frequencySliderMin}
            max={stepData.frequencySliderMax}
            step={stepData.frequencySliderStep}
            defaultValue={1}
            value={frequency}
            onChange={handleUpdateFrequency}
          />
        </Control>
      )}

      {stepData.showConvergenceSlider && (
        <Control width={sliderWidth}>
          <Slider
            label="Convergence"
            width={sliderWidth}
            min={0}
            max={1}
            step={0.01}
            defaultValue={0}
            value={convergence}
            onChange={handleUpdateConvergence}
          />
        </Control>
      )}

      {stepData.showNumOfHarmonicsSlider && (
        <Control width={sliderWidth}>
          <Slider
            label="# of Harmonics"
            width={sliderWidth}
            min={0}
            max={75}
            step={1}
            defaultValue={1}
            value={numOfHarmonics}
            onChange={handleUpdateNumOfHarmonics}
          />
        </Control>
      )}

      {stepData.showPhaseSlider && (
        <Control width={sliderWidth}>
          <Slider
            label="Phase"
            width={sliderWidth}
            min={0}
            max={360}
            step={1}
            defaultValue={0}
            value={phase}
            onChange={handleUpdatePhase}
          />
        </Control>
      )}
    </ControlsWrapper>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ControlsWrapper = styled.div`
  @media (orientation: portrait) {
    padding-bottom: 40px;
  }
`;

const Control = styled.div`
  display: inline-block;
  max-width: ${props => props.width + 'px'};
  animation: ${fadeIn} 750ms;

  &:nth-child(odd) {
    margin-right: 8px;
  }

  &:nth-child(even) {
    margin-left: 8px;
  }
`;

export default WaveformControls;
