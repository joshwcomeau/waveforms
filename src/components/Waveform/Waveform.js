// @flow
import React from 'react';

import { getPathForWaveformShape, getTracePosition } from './Waveform.helpers';

import type { WaveformShape } from '../../types';

type Props = {
  shape: WaveformShape,
  size: number,
  color: string,
  progressPercentage: number,
};

const VIEWBOX_WIDTH = 190;
const VIEWBOX_HEIGHT = 160;

const Waveform = ({
  shape,
  size = 190,
  color = 'black',
  progressPercentage,
}) => {
  const svgPath = getPathForWaveformShape(shape);

  const width = size;
  const height = Math.round(size * 0.842);

  let tracePosition;
  if (typeof progressPercentage === 'number') {
    tracePosition = getTracePosition(
      shape,
      VIEWBOX_WIDTH,
      VIEWBOX_HEIGHT,
      progressPercentage
    );
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
    >
      <path stroke="black" fill="none" d={svgPath} />

      {tracePosition && (
        <circle cx={tracePosition.x} cy={tracePosition.y} r={5} fill="red" />
      )}
    </svg>
  );
};

export default Waveform;
