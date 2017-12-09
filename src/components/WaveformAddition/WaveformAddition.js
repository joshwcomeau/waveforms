// @flow
import React from 'react';

import {
  getPointsForWaveform,
  applyWaveformAddition,
} from '../../helpers/waveform.helpers';
import { DEFAULT_WAVEFORM_SIZE } from '../../constants';

import WaveformCollection from '../WaveformCollection';

import type { Props as WaveformProps } from '../Waveform';

type Props = {
  size?: number,
  waveforms: [WaveformProps, WaveformProps],
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
  const [firstWave, secondWave] = waveforms;

  if (waveforms.length < 2) {
    throw new Error('Please supply at least 2 waveforms to WaveformAddition.');
  }

  // For this to work, we need to figure out the points for each waveform
  // provided.
  const firstWavePoints = getPointsForWaveform({ ...firstWave, width: size });
  const secondWavePoints = getPointsForWaveform({ ...secondWave, width: size });

  // Next, we need to map through each one, getting the relative value based on
  // the progress.
  const firstWaveAdjustedPoints = applyWaveformAddition(
    firstWavePoints,
    secondWavePoints,
    progress,
  );
  const secondWaveAdjustedPoints = applyWaveformAddition(
    secondWavePoints,
    firstWavePoints,
    progress,
  );

  return (
    <WaveformCollection
      size={size}
      waveforms={[
        { ...firstWave, points: firstWaveAdjustedPoints },
        { ...secondWave, points: secondWaveAdjustedPoints },
      ]}
    />
  );
};

WaveformAddition.defaultProps = defaultProps;

export default WaveformAddition;
