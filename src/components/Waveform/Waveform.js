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

const VIEWBOX_WIDTH = 200;
const VIEWBOX_HEIGHT = 100;
const ASPECT_RATIO = VIEWBOX_HEIGHT / VIEWBOX_WIDTH;

const Waveform = ({
  shape,
  size = VIEWBOX_WIDTH,
  color = 'black',
  progressPercentage,
}) => {
  const width = size;
  const height = Math.round(size * ASPECT_RATIO);

  const start = performance.now();
  const svgPath = getPathForWaveformShape(shape, width, height);
  console.log(performance.now() - start);

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
