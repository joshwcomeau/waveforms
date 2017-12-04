// @flow
import React from 'react';

import { WAVEFORM_ASPECT_RATIO } from '../../constants';
import { getPathForPoints } from './Waveform.helpers';

import type { WaveformShape } from '../../types';

const VIEWBOX_WIDTH = 200;
const VIEWBOX_HEIGHT = VIEWBOX_WIDTH * WAVEFORM_ASPECT_RATIO;

export type Props = {
  // 'size' will be used for the width, and the height will be derived, using
  // the ASPECT_RATIO constant.
  size?: number,
  // Line color for the waveform line.
  // TODO: Find a way to support other line features (width, endcap) in a nice
  // way?
  color?: string,
  points: Uint8Array,
};

const Waveform = ({
  shape,
  size = VIEWBOX_WIDTH,
  color = 'black',
  points,
}: Props) => {
  const width = size;
  const height = Math.round(size * WAVEFORM_ASPECT_RATIO);

  const svgPath = getPathForPoints(points);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      style={{ overflow: 'visible' }}
    >
      <path stroke="black" fill="none" d={svgPath} />

      {/* tracePosition && (
        <circle cx={tracePosition.x} cy={tracePosition.y} r={5} fill="red" />
      )*/}
    </svg>
  );
};

export default Waveform;
