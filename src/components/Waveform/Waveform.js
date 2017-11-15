// @flow
import React from 'react';

import { getPathForWaveformShape } from './Waveform.helpers';

import type { WaveformShape } from '../../types';

type Props = {
  shape: WaveformShape,
  width: number,
  height: number,
};

const Waveform = ({ shape, width = 20, height = 20 }) => {
  const svgPath = getPathForWaveformShape(shape);

  return (
    <svg width={width} height={height} viewBox="0 0 100 100">
      <path stroke="black" strokeWidth={1} d={svgPath} />
    </svg>
  );
};

export default Waveform;
