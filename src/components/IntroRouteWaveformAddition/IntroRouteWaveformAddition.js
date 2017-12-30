// @flow
/**
 * This wrapper shares a lot in common with `IntroRouteWaveform`.
 * Still not sure if it should be standalone, or merged in.
 */
import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { getHarmonicsForWave } from '../../helpers/waveform.helpers';

import WaveformAddition from '../WaveformAddition';
import WaveformAxis from '../WaveformAxis';
import FadeTransition from '../FadeTransition';
import Slider from '../Slider';
import Row from '../Row';

import type { WaveformShape } from '../../types';
import type { StepData } from '../IntroRoute/IntroRoute.steps';

type Props = {
  width: number,
  stepData: StepData,
};

type State = {
  baseFrequency: number,
  baseAmplitude: number,
  harmonicsFor: WaveformShape,
  numOfHarmonics: number,
  convergence: number,
};

class IntroRouteWaveformAddition extends PureComponent<Props, State> {
  state = {
    baseFrequency: 1,
    baseAmplitude: 1,
    harmonicsFor: 'square',
    numOfHarmonics: 2,
    convergence: 0,
  };

  componentDidUpdate(prevProps: Props) {
    const {
      harmonicsForOverride,
      numOfHarmonicsOverride,
    } = this.props.stepData;

    if (
      typeof harmonicsForOverride === 'string' &&
      prevProps.stepData.harmonicsForOverride !== harmonicsForOverride
    ) {
      this.handleUpdateHarmonicsFor(harmonicsForOverride);
    }

    if (
      typeof numOfHarmonicsOverride === 'number' &&
      prevProps.stepData.numOfHarmonicsOverride !== numOfHarmonicsOverride
    ) {
      this.handleUpdateNumOfHarmonics(numOfHarmonicsOverride);
    }
  }

  handleUpdateValue = (key: string) => (val: number) => {
    this.setState({ [key]: val });
  };

  handleUpdateBaseFrequency = this.handleUpdateValue('baseFrequency');
  handleUpdateBaseAmplitude = this.handleUpdateValue('baseAmplitude');
  handleUpdateHarmonicsFor = this.handleUpdateValue('harmonicsFor');
  handleUpdateNumOfHarmonics = this.handleUpdateValue('numOfHarmonics');
  handleUpdateConvergence = this.handleUpdateValue('convergence');

  render() {
    const { width, stepData } = this.props;
    const {
      baseFrequency,
      baseAmplitude,
      harmonicsFor,
      numOfHarmonics,
      convergence,
    } = this.state;

    const waveforms = [
      {
        shape: 'sine',
        frequency: baseFrequency,
        amplitude: baseAmplitude,
        offset: 0,
        strokeWidth: 5,
        color: COLORS.primary[500] + '88',
      },
      ...getHarmonicsForWave({
        shape: harmonicsFor,
        baseFrequency: baseFrequency,
        baseAmplitude: baseAmplitude,
        maxNumberToGenerate: numOfHarmonics,
        strokeWidth: 5,
        color: COLORS.secondary[500] + '44',
      }),
    ];

    return (
      <FlexParent>
        <WaveformWrapper>
          <Motion
            defaultStyle={{ convergence: 0 }}
            style={{ convergence: spring(convergence) }}
          >
            {({ convergence }) => (
              <WaveformAddition
                size={width}
                waveforms={waveforms}
                convergence={convergence}
              />
            )}
          </Motion>

          <WaveformAxis
            x
            strokeWidth={4}
            waveformSize={width}
            showLabels={false}
            opacity={1}
          />

          <WaveformAxis
            y
            strokeWidth={4}
            waveformSize={width}
            showLabels={false}
            opacity={1}
          />
        </WaveformWrapper>

        <ControlsWrapper>
          <Row gutter={15}>
            <FadeTransition isVisible={stepData.showConvergenceSlider}>
              <Slider
                label="Convergence"
                width={width / 2 - 15}
                min={0}
                max={1}
                step={0.01}
                defaultValue={0}
                value={convergence}
                onChange={this.handleUpdateConvergence}
              />
            </FadeTransition>

            <FadeTransition isVisible={stepData.showNumOfHarmonicsSlider}>
              <Slider
                label="Number of Harmonics"
                width={width / 2 - 15}
                min={1}
                max={75}
                step={1}
                defaultValue={1}
                value={numOfHarmonics}
                onChange={this.handleUpdateNumOfHarmonics}
              />
            </FadeTransition>
          </Row>
        </ControlsWrapper>
      </FlexParent>
    );
  }
}

// TODO: deduplicate with IntroRouteWaveform
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

export default IntroRouteWaveformAddition;
