// @flow
/**
 * This wrapper shares a lot in common with `IntroRouteWaveform`.
 * Still not sure if it should be standalone, or merged in.
 */
import React, { Fragment, PureComponent } from 'react';

import { getWaveforms } from '../../helpers/waveform.helpers';

import WaveformAddition from '../WaveformAddition';
import WaveformAxis from '../WaveformAxis';

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
};

class IntroRouteWaveformAddition extends PureComponent<Props> {
  render() {
    const { width, convergence } = this.props;

    return (
      <Fragment>
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
      </Fragment>
    );
  }
}

export default IntroRouteWaveformAddition;
