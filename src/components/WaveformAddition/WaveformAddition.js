// @flow
import React from 'react';

import {
  getPointsForWaveform,
  applyWaveformAddition,
} from '../../helpers/waveform.helpers';
import { DEFAULT_WAVEFORM_SIZE } from '../../constants';
import { range, sum } from '../../utils';

import WaveformCollection from '../WaveformCollection';

import type { Props as WaveformProps } from '../Waveform';

type Props = {
  size?: number,
  waveforms: Array<WaveformProps>,
  progress: number,
};

const defaultProps = {
  size: DEFAULT_WAVEFORM_SIZE,
};

// Waveform addition is the process of combining 2 waveforms to produce a
// single waveform that contains both.
// This component shows that process in action. It will draw 2 waveforms, but
// with them moving towards intersecting, based on a `progress` number from
// 0 to 1. At 1, the two lines will be totally overlapping.
const WaveformAddition = ({ size, waveforms, progress }: Props) => {
  if (waveforms.length < 2) {
    throw new Error('Please supply at least 2 waveforms to WaveformAddition.');
  }

  // To avoid repeating work, get an array of waveform point arrays upfront,
  // to use while doing the addition.
  const waveformPointsArray = waveforms.map(waveform =>
    getPointsForWaveform({ ...waveform, width: size })
  );

  // We want to move every wave closer to our "ideal" wave, which is the sum
  // of all values at every point. Let's calculate that first.
  // It doesn't actually matter which wave we focus on as "primary", since all
  // waves converge when at 100% progress
  const idealWaveformPoints = applyWaveformAddition(
    waveformPointsArray[0],
    waveformPointsArray,
    1
  );

  // Now, for each wave, iterate through and compare it to the ideal wave.
  const waveformPointsWithAdjustments = waveformPointsArray.map(
    (waveformPoints, index) => {
      return applyWaveformAddition(
        waveformPoints,
        [idealWaveformPoints],
        progress
      );
    }
  );

  const waveformsWithNewPoints = waveforms.map((waveform, index) => ({
    ...waveform,
    points: waveformPointsWithAdjustments[index],
  }));

  return <WaveformCollection size={size} waveforms={waveformsWithNewPoints} />;
};

WaveformAddition.defaultProps = defaultProps;

export default WaveformAddition;
