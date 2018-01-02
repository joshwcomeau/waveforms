// @flow
/**
 * This wrapper shares a lot in common with `IntroRouteWaveform`.
 * Still not sure if it should be standalone, or merged in.
 */
import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';
import styled from 'styled-components';

import { COLORS } from '../../constants';
import { convertHexToRGBA } from '../../utils';
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
  baseFrequency: number,
  baseAmplitude: number,
  harmonicsForShape: WaveformShape,
  numOfHarmonics: number,
  convergence: number,
  handleUpdateHarmonicsForShape: (shape: WaveformShape) => void,
  handleUpdateNumOfHarmonics: (val: number) => void,
  handleUpdateConvergence: (val: number) => void,
};

class IntroRouteWaveformAddition extends PureComponent<Props> {
  render() {
    const {
      width,
      stepData,
      baseFrequency,
      baseAmplitude,
      harmonicsForShape,
      numOfHarmonics,
      convergence,
      handleUpdateNumOfHarmonics,
      handleUpdateConvergence,
    } = this.props;

    // We want to render our base waveform, plus all available harmonics.
    // I'm reversing their order since the order affects draw layer in
    // SVG/Canvas. I want the base waveform to be on "top", so it has to be
    // last in the array.
    const waveforms = [
      ...getHarmonicsForWave({
        shape: harmonicsForShape,
        baseFrequency: baseFrequency,
        baseAmplitude: baseAmplitude,
        maxNumberToGenerate: numOfHarmonics,
        strokeWidth: 5,
        color: convertHexToRGBA(COLORS.secondary[500], 0.6),
      }),
      {
        shape: 'sine',
        frequency: baseFrequency,
        amplitude: baseAmplitude,
        offset: 0,
        strokeWidth: 5,
        color: convertHexToRGBA(COLORS.primary[500], 0.6),
      },
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
                onChange={handleUpdateConvergence}
              />
            </FadeTransition>

            <FadeTransition isVisible={stepData.showNumOfHarmonicsSlider}>
              <Slider
                label="# of Harmonics"
                width={width / 2 - 15}
                min={1}
                max={75}
                step={1}
                defaultValue={1}
                value={numOfHarmonics}
                onChange={handleUpdateNumOfHarmonics}
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
