// @flow
/**
 * This wrapper shares a lot in common with `IntroRouteWaveform`.
 * Still not sure if it should be standalone, or merged in.
 */
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { getWaveforms } from '../../helpers/waveform.helpers';

import WaveformAddition from '../WaveformAddition';
import WaveformAxis from '../WaveformAxis';
import FadeTransition from '../FadeTransition';
import Slider from '../Slider';
import Row from '../Row';

import type { WaveformShape, WaveformAdditionType } from '../../types';
import type { StepData } from '../IntroRoute/IntroRoute.steps';

type Props = {
  type: WaveformAdditionType,
  width: number,
  stepData: StepData,
  baseFrequency: number,
  baseAmplitude: number,
  phase: number,
  harmonicsForShape: WaveformShape,
  numOfHarmonics: number,
  convergence: number,
  phase: number,
  handleUpdateHarmonicsForShape: (shape: WaveformShape) => void,
  handleUpdateNumOfHarmonics: (val: number) => void,
  handleUpdateConvergence: (val: number) => void,
  handleUpdatePhase: (val: number) => void,
};

class IntroRouteWaveformAddition extends PureComponent<Props> {
  render() {
    const {
      width,
      stepData,
      numOfHarmonics,
      convergence,
      phase,
      handleUpdateNumOfHarmonics,
      handleUpdateConvergence,
      handleUpdatePhase,
    } = this.props;

    return (
      <FlexParent>
        <WaveformWrapper>
          <WaveformAddition
            size={width}
            waveforms={getWaveforms(this.props)}
            convergence={convergence}
          />

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
            <FadeTransition
              mountOnEnter
              unmountOnExit
              isVisible={stepData.showConvergenceSlider}
            >
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

            <FadeTransition
              mountOnEnter
              unmountOnExit
              isVisible={stepData.showNumOfHarmonicsSlider}
            >
              <Slider
                label="# of Harmonics"
                width={width / 2 - 15}
                min={0}
                max={75}
                step={1}
                defaultValue={1}
                value={numOfHarmonics}
                onChange={handleUpdateNumOfHarmonics}
              />
            </FadeTransition>

            <FadeTransition
              mountOnEnter
              unmountOnExit
              isVisible={stepData.showPhaseSlider}
              // HACK: our 3 items don't fit in the 2-item row.
              // By convention, we never show the # of Harmonics slider at the
              // same time as the phase slider (the two don't make sense to
              // be used together).
              // Unfortunately, when scrolling up, the # of Harmonics intro
              // animation pushes the phase slider to the right, into the
              // tutorial column, as it fades away.
              // We fix this by setting the fade-out duration to 1ms, but it's
              // not a great solution. `0` breaks for unknown reasons.
              duration={stepData.showNumOfHarmonicsSlider ? 1 : 500}
            >
              <Slider
                label="Phase"
                width={width / 2 - 15}
                min={0}
                max={360}
                step={1}
                defaultValue={0}
                value={phase}
                onChange={handleUpdatePhase}
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
